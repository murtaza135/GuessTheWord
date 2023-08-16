import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { type ExtractEnumValue } from '../types/utils';

const statusCodes = {
  [ReasonPhrases.BAD_REQUEST]: StatusCodes.BAD_REQUEST,
  [ReasonPhrases.UNAUTHORIZED]: StatusCodes.UNAUTHORIZED,
  [ReasonPhrases.FORBIDDEN]: StatusCodes.FORBIDDEN,
  [ReasonPhrases.NOT_FOUND]: StatusCodes.NOT_FOUND,
  [ReasonPhrases.REQUEST_TOO_LONG]: StatusCodes.REQUEST_TOO_LONG,
  [ReasonPhrases.TOO_MANY_REQUESTS]: StatusCodes.TOO_MANY_REQUESTS,
  [ReasonPhrases.INTERNAL_SERVER_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
} as const;

export type StatusText = ExtractEnumValue<keyof typeof statusCodes, string>;
export type Status = ExtractEnumValue<typeof statusCodes[StatusText], number>;
