export { default as authRouter } from './auth.routes';
export { default as initAuthStrategies } from './auth.strategies';
export { authenticate, protect, startOAuth, logout } from './auth.middleware';

export type { Strategy } from './auth.strategies';
export type { AuthOptions, StartOAuthOptions } from './auth.middleware';
export type { ExpressUser } from './auth.types';
