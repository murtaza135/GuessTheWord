import '@colors/colors';
import './config/dotenv';
import config from './config/config';
import app from './app';
import { logger } from './config/logger';
import GracefulShutdown from './config/graceful-shutdown';

const server = app.listen(config.PORT, () => {
  logger.info(`[GuessTheWord] server running: ${config.NODE_ENV} mode on port ${config.PORT}`);
});

GracefulShutdown(server);

export default server;
