importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

if (workbox) {
  console.log("[Workbox] Loaded");

  const CACHE_VERSION = "v3";
  const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
  const API_CACHE = `api-cache-${CACHE_VERSION}`;
  const FALLBACK_URL = "/offline.html";

  self.skipWaiting();
  workbox.core.clientsClaim();

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: STATIC_CACHE,
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 50 }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/stories"),
    new workbox.strategies.NetworkFirst({
      cacheName: API_CACHE,
      networkTimeoutSeconds: 3,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin.startsWith("https://fonts.googleapis.com") ||
      url.origin.startsWith("https://fonts.gstatic.com"),
    new workbox.strategies.StaleWhileRevalidate({ cacheName: "google-fonts" })
  );

  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "image" ||
      request.url.match(/\.(?:png|jpg|jpeg|svg|gif|webp)$/),
    new workbox.strategies.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "script" || request.destination === "style",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );

  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === "document") {
      return caches.match(FALLBACK_URL);
    }

    if (event.request.destination === "image") {
      return caches.match(event.request).then((cachedImage) => {
        if (cachedImage) {
          return cachedImage;
        }
        return Response.error();
      });
    }

    return Response.error();
  });

  self.addEventListener("message", (event) => {
    if (event.data && event.data.action === "skipWaiting") {
      self.skipWaiting();
    }
  });
} else {
  console.warn("[Workbox] Not loaded. Offline support not available.");
}
