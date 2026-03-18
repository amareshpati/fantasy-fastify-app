import 'dotenv/config';

export const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
};

if (!config.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL is not set in environment variables');
}
