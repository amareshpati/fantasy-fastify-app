import type { FastifyInstance } from 'fastify';
import { config } from '../config/env.js';
import userRoutes from './user.routes.js';
import healthRoutes from './health.routes.js';

export default async function rootRoutes(fastify: FastifyInstance) {
    // Base route
    fastify.get('/', async (request, reply) => {
        return {
            status: 'online',
            message: 'Welcome to the Fantasy Fastify App!',
            timestamp: new Date().toISOString(),
            env: config.NODE_ENV
        };
    });

    // Register other routes with prefix
    fastify.register(userRoutes, { prefix: '/api' });
    fastify.register(healthRoutes, { prefix: '/api' });
}
