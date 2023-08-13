import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

const precacheEntries = self.__WB_MANIFEST;
precacheAndRoute(precacheEntries);
