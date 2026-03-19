import type { FastifyInstance } from 'fastify';
import { registerSchema, loginSchema } from './auth.schema.js';
import { register, login } from './auth.service.js';

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/auth/register', {
        schema: registerSchema,
    }, register(fastify));

    fastify.post('/auth/login', {
        schema: loginSchema,
    }, login(fastify));
}
