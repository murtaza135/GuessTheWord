import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

const precacheEntries = self.__WB_MANIFEST;
console.log(precacheEntries);
precacheAndRoute(precacheEntries);
cleanupOutdatedCaches();

self.skipWaiting();
clientsClaim();