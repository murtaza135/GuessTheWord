const config = {
  NUM_TRIES: 10,
  NON_HTTP_SESSION_COOKIE_NAME: 'session-non-http',
  ...import.meta.env,
} as const;

export default config;