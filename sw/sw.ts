import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

// const VERSION = 'v1';

// const ASSETS = [
//   '/assets/index-4e3afe28.css',
//   '/assets/index-b2130b6e.js'
// ];

// self.addEventListener('install', async function (event) {
//   console.log("[Service Worker] Installing service worker...", event);

//   const staticCache = await caches.open(`static-cache-${VERSION}`);
//   await staticCache.addAll(ASSETS);
// });

// self.addEventListener('activate', function (event) {
//   console.log("[Service Worker] Activating service worker...", event);
// });

// self.addEventListener('fetch', function (event) {
//   console.log("[Service Worker] Fetching request...", event);
// });