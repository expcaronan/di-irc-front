
import axios from "axios";
import baseUrlString from "../Api/baseUrlString";

const API_URL = baseUrlString.test;

// Your React app is hosted under /irc-app/
const SERVICE_WORKER_PATH = "/irc-app/service-worker.js";

function urlBase64ToArrayBuffer(
  base64String: string
): ArrayBuffer {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4
  );

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray.buffer;
}

export async function registerServiceWorker() {
  if (!window.isSecureContext) {
    throw new Error(
      "Web Push requires HTTPS, except on localhost."
    );
  }

  if (!("serviceWorker" in navigator)) {
    throw new Error(
      "Service Workers are unavailable in this browser context."
    );
  }

  if (!("PushManager" in window)) {
    throw new Error(
      "Push notifications are not supported by this browser."
    );
  }

  if (!("Notification" in window)) {
    throw new Error(
      "Browser notifications are not supported."
    );
  }

  const registration =
    await navigator.serviceWorker.register(
      SERVICE_WORKER_PATH
    );

  await navigator.serviceWorker.ready;

  return registration;
}

export async function registerPushNotifications() {
  // Request permission after the user clicks Enable Notifications.
  if (!("Notification" in window)) {
    throw new Error(
      "Browser notifications are not supported."
    );
  }

  const permission =
    await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error(
      "Notification permission was not granted."
    );
  }

  // Register the service worker.
  const registration = await registerServiceWorker();

  // Get VAPID public key from ASP.NET Core.
  const response = await axios.get(
    `${API_URL}/pushSubscription/public-key`
  );

  const publicKey = response.data.publicKey;

  if (!publicKey) {
    throw new Error(
      "Web Push public key was not returned by the API."
    );
  }

  // Reuse an existing browser subscription if available.
  let subscription =
    await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription =
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          urlBase64ToArrayBuffer(publicKey),
      });
  }

  const subscriptionJson = subscription.toJSON();

  if (
    !subscriptionJson.endpoint ||
    !subscriptionJson.keys?.p256dh ||
    !subscriptionJson.keys?.auth
  ) {
    throw new Error(
      "Browser returned an invalid push subscription."
    );
  }

  // Read the saved JWT.
  const storedCredentials =
    localStorage.getItem("Credentials");

  if (!storedCredentials) {
    throw new Error(
      "Please log in before enabling notifications."
    );
  }

  let token = storedCredentials;

  try {
    const parsed = JSON.parse(storedCredentials);

    if (typeof parsed === "string") {
      token = parsed;
    } else {
      token =
        parsed.accessToken ??
        parsed.token ??
        parsed.Token ??
        "";
    }
  } catch {
    // Credentials may already contain a raw JWT.
  }

  token = token.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error(
      "A valid access token was not found."
    );
  }

  // Save the subscription against the authenticated employee.
  await axios.post(
    `${API_URL}/pushSubscription/subscribe`,
    {
      endpoint: subscriptionJson.endpoint,
      p256dh: subscriptionJson.keys.p256dh,
      auth: subscriptionJson.keys.auth,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return subscription;
}
