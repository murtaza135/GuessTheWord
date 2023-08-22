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
  const method = tokens.method(req, res) ?? 'unknown_method';
  const url = tokens.url(req, res) ?? 'unknown_url';
  const status = tokens.status(req, res) ?? 'unknown_status';
  const statusText = status ? getReasonPhrase(status) : 'unknown_status_text';
  const responseTime = `${tokens['response-time'](req, res)}ms` ?? 'unknown_response_time';
  return `${method} ${url} | ${status} ${statusText} | ${responseTime}`;
};

const skip = () => !config.IS_DEVELOPMENT;
const stream = {
  write: (message: string) => logger.http(message.trim())
};

export default () => morgan(morganFormat, { skip, stream });
