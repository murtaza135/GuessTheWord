import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { Queue, BackgroundSyncPlugin } from 'workbox-background-sync';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import config from './config/config';
import { queryClient } from './app/api/queryClient';

declare const self: ServiceWorkerGlobalScope;

// precache all assets determined by globPatterns and includeAssets in vite.config.ts
const precacheEntries = self.__WB_MANIFEST;
precacheAndRoute(precacheEntries);
cleanupOutdatedCaches();

self.skipWaiting();
clientsClaim();

// const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
//   maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
//   onSync: ({ queue }) => { console.log("onsync"); }
// });

// registerRoute(
//   `${config.VITE_API_URL}/losses/increment`,
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'POST'
// );

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

self.addEventListener('fetch', event => {
  // Add in your own criteria here to return early if this
  // isn't a request that should use background sync.
  if (event.request.method !== 'POST' || event.request.url !== `${config.VITE_API_URL}/losses/increment`) {
    return;
  }

  console.log(event.request);
  const bgSyncLogic = async () => {
    try {
      const response = await fetch(event.request.clone());
      console.log(response);
      return response;
    } catch (error) {
      console.log("HERE");
      const req = await queue.popRequest();
      const numLosses = (await req?.request.json())?.losses ?? 0;
      const newReq = new Request(event.request, { body: JSON.stringify({ losses: numLosses + 1 }) });
      await queue.pushRequest({ request: newReq });
      // return error as Response; // TODO
      // return true as unknown as Response;
      const res = new Response();
      return res;
    }
  };

  event.respondWith(bgSyncLogic());
});    