import './config/dotenv';
import app from './app';
import config from './config/config';
import { logger } from './config/logger';

const server = app.listen(config.PORT, () => {
  logger.info(`[GuessTheWord] server running: ${config.NODE_ENV} mode on port ${config.PORT}`);
});

export default server;
