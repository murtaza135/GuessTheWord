import './config/dotenv';
import app from './app';
import { PORT } from './config/config';
import { logger } from './config/logger';

const server = app.listen(PORT, () => logger.info(`[GuessTheWord] server running: ${process.env.NODE_ENV} mode on port ${PORT}`));

export default server;
