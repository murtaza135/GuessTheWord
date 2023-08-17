import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';
import globalExtension from './extensions/global.extension';

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

// @ts-ignore https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#exit-hooks
prisma.$on('beforeExit', () => {
  logger.info('Closing database connection');
});

const xprisma = prisma
  .$extends(globalExtension);

export default xprisma;
