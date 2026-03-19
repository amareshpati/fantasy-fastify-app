import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { registerSchema, loginSchema } from './auth.schema.js';
import { register, login } from './auth.service.js';

const authRoutes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.post('/auth/register', {
        schema: registerSchema,
    }, register(fastify));

    fastify.post('/auth/login', {
        schema: loginSchema,
    }, login(fastify));
}

export default authRoutes;
