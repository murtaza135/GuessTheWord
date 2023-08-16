import { IncomingMessage, ServerResponse } from 'http';
import morgan from 'morgan';
import { getReasonPhrase } from 'http-status-codes';
import logger from './winston';
import config from '../config';

const morganFormat = (
  tokens: morgan.TokenIndexer<IncomingMessage, ServerResponse<IncomingMessage>>,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const statusCode = tokens.status(req, res);
  const statusReasonPhrase = getReasonPhrase(statusCode as string);
  const responseTime = tokens['response-time'](req, res);
  return `${method} ${url} | ${statusCode} ${statusReasonPhrase} | ${responseTime}ms`;
};

const skip = () => !config.IS_DEVELOPMENT;
const stream = {
  write: (message: string) => logger.http(message.trim())
};

export default morgan(morganFormat, { skip, stream });
