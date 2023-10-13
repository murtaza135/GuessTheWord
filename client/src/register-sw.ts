import { registerSW } from 'virtual:pwa-register';
import { queryClient } from './app/api/queryClient';

type SWEvent = MessageEvent<{ refetch: boolean; }>;

const intervalMS = 24 * 60 * 60 * 1000; // 24 hours

export const updateSW = registerSW({
  onOfflineReady() { },
  onRegisteredSW(_swScriptUrl, registration) {
    navigator.serviceWorker.addEventListener('message', (event: SWEvent) => {
      if (event.data.refetch) queryClient.refetchQueries();
    });

    // check and autoupdate service worker every `intervalMS`
    registration && setInterval(() => {
      registration.update();
    }, intervalMS);
  }
});
