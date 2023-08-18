import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';
import globalExtension from './extensions/global.extension';
import userExtension from './extensions/user.extension';

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query', },
    { emit: 'event', level: 'error', },
    { emit: 'event', level: 'info', },
    { emit: 'event', level: 'warn', },
  ]
});

prisma.$on('query', (event) => {
  logger.debug(`${event.query} - params=${event.params}`);
});

prisma.$on('info', (event) => {
  logger.info(event.message);
});

prisma.$on('warn', (event) => {
  logger.warn(event.message);
});

prisma.$on('error', (event) => {
  // TODO ?? most errors happen to be operational errors, in which case they are only info based
  logger.error(event.message);
});

const xprisma = prisma
  .$extends(globalExtension)
  .$extends(userExtension);

export default xprisma;
