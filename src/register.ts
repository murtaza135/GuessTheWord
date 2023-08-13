import { registerSW } from 'virtual:pwa-register';

const intervalMS = 24 * 60 * 60 * 1000; // 24 hours

const updateSW = registerSW({
  onOfflineReady() { },
  onRegistered(registration) {
    registration && setInterval(() => {
      registration.update();
    }, intervalMS);
  }
});

export default updateSW;