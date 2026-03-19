import Fastify from 'fastify';
import { config } from './config/env.js';
import { randomUUID } from 'node:crypto';
import swaggerPlugin from './plugins/swagger.plugin.js';
import jwtPlugin from './plugins/jwt.plugin.js';
import userRoutes from './modules/user/user.routes.js';
import healthRoutes from './modules/health/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';

export const buildConfigs = async () => {
    const fastify = Fastify({
        logger: {
            level: config.LOG_LEVEL,
            // will active this later 
            // redact: [
            //     'headers.authorization',
            //     'headers.cookie',
            //     'body.password',
            //     'body.token',
            //     'body.accessToken'
            // ],

            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:HH:MM:ss',
                    ignore: 'pid,hostname',
                },
            },
        },
        genReqId: (req) => {
            // header best practice: don't use "x-" https://www.rfc-editor.org/info/rfc6648 and keep it lowercase
            return (req.headers['request-id'] as string) ?? randomUUID();
        },
        routerOptions: {
            ignoreDuplicateSlashes: true,
        },
        ajv: {
            customOptions: {
                keywords: ['example'],
            },
        },
    });

    // Register plugins
    await fastify.register(swaggerPlugin);
    await fastify.register(jwtPlugin);

    // Register routes
    await fastify.register(healthRoutes, { prefix: '/' });
    await fastify.register(userRoutes, { prefix: '/api' });
    await fastify.register(authRoutes, { prefix: '/api' });

    return fastify;
}