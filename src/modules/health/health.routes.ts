import type { FastifyInstance } from 'fastify';
import { getHealth, getRoot } from './health.service.js';

export default async function healthRoutes(fastify: FastifyInstance) {
    fastify.get('/', getRoot);
    fastify.get('/health', getHealth);
}
