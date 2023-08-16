import EventEmitter from 'events';
import { Server } from 'http';
import { randomBytes } from 'crypto';
import HTTPGracefulShutdown, { Options } from 'http-graceful-shutdown';
import { logger } from './logger';

const httpGracefulShutdownConfig: Options = {
  signals: 'uncaughtException unhandledRejection SIGINT SIGTERM',
  timeout: 30 * 1000, // 30 seconds (in ms),
  onShutdown: async (signal) => {
    if (!signal) {
      logger.error('Server has been shutdown due to an unknown error');
    } else if (signal === 'uncaughtException' || signal === 'unhandledRejection') {
      logger.error(`Server has been shutdown due to ${signal}`);
    } else if (signal === 'manual') {
      logger.warn('Server has been shutdown MANUALLY');
    } else {
      logger.warn(`Server has been shutdown due to ${signal}`);
    }
  }
};

// setup an event emitter, this will be used to emit a custom event
// that will gracefully shutdown the server
const eventId = `gracefulShutdown-${randomBytes(16).toString('hex')}`;
const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1);

const GracefulShutdown = (server: Server) => {
  const callback = HTTPGracefulShutdown(server, httpGracefulShutdownConfig);
  eventEmitter.removeAllListeners(eventId);
  eventEmitter.on(eventId, callback);
};

export const shutdownGracefully = () => {
  eventEmitter.emit(eventId);
};

export default GracefulShutdown;
