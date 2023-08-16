import './config/dotenv';
import app from './app';
import config from './config/config';
import { logger } from './config/logger';
import GracefulShutdown from './config/graceful-shutdown';

const server = app.listen(config.PORT, () => {
  logger.info(`[GuessTheWord] server running: ${config.NODE_ENV} mode on port ${config.PORT}`);
});

GracefulShutdown(server);

export default server;
