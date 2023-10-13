import { config } from '@/app/config';
import { WinLossResponse } from '@/features/win-loss/types';
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { Queue } from 'workbox-background-sync';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';

type WinResponse = Pick<WinLossResponse, 'wins'>;
type LossResponse = Pick<WinLossResponse, 'losses'>;

declare const self: ServiceWorkerGlobalScope;

// precache all assets determined by globPatterns and includeAssets in vite.config.ts
const precacheEntries = self.__WB_MANIFEST;
precacheAndRoute(precacheEntries);
cleanupOutdatedCaches();

self.skipWaiting();
clientsClaim();

// queues to hold failed requests
const winsQueue = new Queue('guess-the-word-increment-wins');
const lossesQueue = new Queue('guess-the-word-increment-losses');

// on failed wins increment due to being offline,
// add request to queue to be retried on reconnect/sync
registerRoute(
  `${config.VITE_API_URL}/wins/increment`,
  async ({ request }) => {
    try {
      const response = await fetch(request.clone());
      return response;
    } catch (error) {
      // instead of sending multiple requests to increment wins 1 by 1,
      // combine number of wins to increment from all requests and push
      // a single request back into the queue
      const prevReq = await winsQueue.popRequest();
      const prevData = await prevReq?.request?.json() as WinResponse | undefined;
      const prevWins = prevData?.wins ?? 0;
      const newData = await request.json() as WinResponse;
      const newWins = newData.wins;
      const newReq = new Request(request, {
        body: JSON.stringify({ wins: prevWins + newWins }),
      });
      await winsQueue.pushRequest({ request: newReq });
      return new Response();
    }
  },
  'POST'
);

// on failed losses increment due to being offline,
// add request to queue to be retried on reconnect/sync
registerRoute(
  `${config.VITE_API_URL}/losses/increment`,
  async ({ request }) => {
    try {
      const response = await fetch(request.clone());
      return response;
    } catch (error) {
      // instead of sending multiple requests to increment losses 1 by 1,
      // combine number of losses to increment from all requests and push
      // a single request back into the queue
      const prevReq = await lossesQueue.popRequest();
      const prevData = await prevReq?.request?.json() as LossResponse | undefined;
      const prevLosses = prevData?.losses ?? 0;
      const newData = await request.json() as LossResponse;
      const newLosses = newData.losses;
      const newReq = new Request(request, {
        body: JSON.stringify({ losses: prevLosses + newLosses }),
      });
      console.log('losses sw:', prevLosses + newLosses);
      await lossesQueue.pushRequest({ request: newReq });
      return new Response();
    }
  },
  'POST'
);

// send message to browser to refetch data again (via react query)
// on reconnect/sync
self.addEventListener('sync', () => {
  console.log("SYNC");
  setTimeout(() => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ refetch: true });
      });
    });
  }, 500);
});
