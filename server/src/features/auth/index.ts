export { default as authRouter } from './auth.routes';
export { default as initAuthStrategies } from './auth.strategies';
export { authenticate, protect, connect, startOAuth } from './auth.middleware';

export type { AuthStrategy } from './auth.strategies';
export type { AuthOptions, StartOAuthOptions } from './auth.middleware';
export type { UserData } from './auth.types';
