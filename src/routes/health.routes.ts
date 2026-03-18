import type { FastifyInstance } from 'fastify';
import { getHealth } from '../controllers/health.controller.js';

export default async function healthRoutes(fastify: FastifyInstance) {
    fastify.get('/health', getHealth);
}
