export const VERSION = '1.0.0';
export const VERSION_MAJOR = VERSION.split('.')[0];
export const PORT = process.env.PORT || '5000';
export const IS_DEVELOPMENT = (process.env.NODE_ENV || 'production') === 'development';
