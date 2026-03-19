import 'dotenv/config';

const LOG_LEVELS = {
    development: 'debug',
    staging: 'info',
    production: 'error',
};

const NODE_ENV = {
    development: 'development',
    staging: 'staging',
    production: 'production',
};

export const config = {
    NODE_ENV: process.env.NODE_ENV || NODE_ENV.development,

    isDevelopment: process.env.NODE_ENV === NODE_ENV.development,
    isStaging: process.env.NODE_ENV === NODE_ENV.staging,
    isProduction: process.env.NODE_ENV === NODE_ENV.production,

    PORT: Number(process.env.PORT) || 3000,
    HOST: process.env.HOST || 'localhost',
    DATABASE_URL: process.env.DATABASE_URL as string,
    DIRECT_URL: process.env.DIRECT_URL as string,
    LOG_LEVEL: process.env.LOG_LEVEL || LOG_LEVELS.development,
};

if (!config.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL is not set in environment variables');
}
