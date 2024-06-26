import '@colors/colors';
import './config/dotenv';
import config from './config/config';
import app from './app';
import { logger } from './config/logger';
import configureGracefulShutdown from './config/graceful-shutdown';

const server = app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[GuessTheWord] server running: ${config.NODE_ENV} mode on port ${config.PORT}`);
  logger.info(`[GuessTheWord] server running: ${config.NODE_ENV} mode on port ${config.PORT}`);
});

configureGracefulShutdown(server);

export default server;
