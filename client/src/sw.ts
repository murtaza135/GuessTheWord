import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { Queue } from 'workbox-background-sync';
// import { Queue, BackgroundSyncPlugin } from 'workbox-background-sync';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
// import { NetworkOnly } from 'workbox-strategies';
import config from './config/config';
// import { queryClient } from './app/api/queryClient';

declare const self: ServiceWorkerGlobalScope;

// precache all assets determined by globPatterns and includeAssets in vite.config.ts
const precacheEntries = self.__WB_MANIFEST;
precacheAndRoute(precacheEntries);
cleanupOutdatedCaches();

self.skipWaiting();
clientsClaim();

const queue = new Queue('guess-the-word-increment-losses');

self.addEventListener('sync', () => {
  setTimeout(() => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ refetch: true });
      });
    });
  }, 500);
});

registerRoute(
  `${config.VITE_API_URL}/losses/increment`,
  async ({ request }) => {
    console.log("FETCH 1");
    try {
      const response = await fetch(request.clone());
      console.log(response);
      return response;
    } catch (error) {
      console.log("HERE");
      const req = await queue.popRequest();
      const numLosses = (await req?.request.json())?.losses ?? 0;
      const newReq = new Request(request, { body: JSON.stringify({ losses: numLosses + 1 }) });
      await queue.pushRequest({ request: newReq });
      // return error as Response; // TODO
      // return true as unknown as Response;
      const res = new Response();
      return res;
    }
  },
  'POST'
);
