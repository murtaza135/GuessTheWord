import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { Queue } from 'workbox-background-sync';
// import { Queue, BackgroundSyncPlugin } from 'workbox-background-sync';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
// import { NetworkOnly } from 'workbox-strategies';
import config from './config/config';
// import { queryClient } from './app/api/queryClient';
import { WinLossResponse } from './features/win-loss/types';

type WinResponse = Pick<WinLossResponse, 'wins'>;
type LossResponse = Pick<WinLossResponse, 'losses'>;

declare const self: ServiceWorkerGlobalScope;

// precache all assets determined by globPatterns and includeAssets in vite.config.ts
const precacheEntries = self.__WB_MANIFEST;
precacheAndRoute(precacheEntries);
cleanupOutdatedCaches();

self.skipWaiting();
clientsClaim();

const winsQueue = new Queue('guess-the-word-increment-wins');
const lossesQueue = new Queue('guess-the-word-increment-losses');

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
    try {
      const response = await fetch(request.clone());
      return response;
    } catch (error) {
      console.log(error);
      const prevReq = await lossesQueue.popRequest();
      const prevData = await prevReq?.request?.json() as LossResponse | undefined;
      const prevLosses = prevData?.losses ?? 0;
      const newData = await request.json() as LossResponse;
      const newLosses = newData.losses;
      const newReq = new Request(request, {
        body: JSON.stringify({ losses: prevLosses + newLosses }),
      });
      await lossesQueue.pushRequest({ request: newReq });
      return new Response();
    }
  },
  'POST'
);

registerRoute(
  `${config.VITE_API_URL}/wins/increment`,
  async ({ request }) => {
    try {
      const response = await fetch(request.clone());
      return response;
    } catch (error) {
      console.log(error);
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

