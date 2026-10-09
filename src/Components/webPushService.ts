import axios from "axios";
import EmployeeUserModel from "../Interfaces/EmployeeUserModel";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:44341/api";

function urlBase64ToArrayBuffer(
    base64String: string
): ArrayBuffer {

    const padding =
        "=".repeat(
            (4 - (base64String.length % 4)) % 4
        );

    const base64 =
        (base64String + padding)
            .replace(/-/g, "+")
            .replace(/_/g, "/");

    const rawData = window.atob(base64);

    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] =
            rawData.charCodeAt(i);
    }

    return outputArray.buffer;
}


export async function registerPushNotifications() {

    if (!("serviceWorker" in navigator)) {
        throw new Error(
            "Service Worker is not supported by this browser."
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


    // Ask the user for permission
    const permission =
        await Notification.requestPermission();

    if (permission !== "granted") {
        throw new Error(
            "Notification permission was not granted."
        );
    }


    // Register service worker
    const registration =
        await navigator.serviceWorker.register(
            "/service-worker.js"
        );


    // Wait until service worker is ready
    await navigator.serviceWorker.ready;


    // Get VAPID public key from ASP.NET Core
    const response =
        await axios.get(
            `${API_URL}/pushSubscription/public-key`
        );

    const publicKey =
        response.data.publicKey;


    if (!publicKey) {
        throw new Error(
            "Web Push public key was not returned by the API."
        );
    }


    // Check if this browser already has a subscription
    let subscription =
        await registration.pushManager.getSubscription();


    // Create subscription if one does not exist
    if (!subscription) {

        subscription =
            await registration.pushManager.subscribe({

                userVisibleOnly: true,

                applicationServerKey:
                    urlBase64ToArrayBuffer(
                        publicKey
                    )
            });
    }


    // Convert PushSubscription to JSON
    const subscriptionJson =
        subscription.toJSON();


    if (
        !subscriptionJson.endpoint ||
        !subscriptionJson.keys?.p256dh ||
        !subscriptionJson.keys?.auth
    ) {
        throw new Error(
            "Browser returned an invalid push subscription."
        );
    }

  const storedJsonString = localStorage.getItem('Credentials');
  const hasLocalStorageData = !!localStorage.getItem('Credentials');
    if (hasLocalStorageData) {
        if (storedJsonString !== null) {
            const Token = storedJsonString
            ? JSON.parse(storedJsonString).replace(/^"|"$/g, "")
            : null;
           await axios.post(
            `${API_URL}/pushSubscription/subscribe`,
            {
                // endpoint:
                //     subscriptionJson.endpoint,

                // keys: {
                //     p256dh:
                //         subscriptionJson.keys.p256dh,

                //     auth:
                //         subscriptionJson.keys.auth
                // }
                endpoint: subscription.endpoint,
                p256dh: subscription.toJSON().keys?.p256dh,
                auth: subscription.toJSON().keys?.auth,
            },
            {
            headers: {
                    Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json",
                },
            }
        );
        }
    }
   


    return subscription;
}

