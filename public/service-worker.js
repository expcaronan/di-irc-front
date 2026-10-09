self.addEventListener("install", function () {
    console.log("Web Push Service Worker installed.");
    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    console.log("Web Push Service Worker activated.");

    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("push", function (event) {

    console.log("PUSH EVENT RECEIVED");

    if (!event.data) {
        return;
    }

    const data = event.data.json();

    console.log("Push data:", data);

    const title =
        data.title || "Document Tracking";

    const options = {
        body:
            data.body ||
            "You have a new notification.",

        icon:
            data.icon ||
            "/icons/notification-icon.png",

        badge:
            data.badge ||
            "/icons/notification-badge.png",

        data: {
            url:
                data.url || "/"
        }
    };

    event.waitUntil(
        self.registration.showNotification(
            title,
            options
        )
    );
});

self.addEventListener(
    "notificationclick",
    function (event) {

        event.notification.close();

        const url =
            event.notification.data?.url || "/";

        event.waitUntil(
            self.clients.openWindow(url)
        );
    }
);