import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../config/env.js';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { id: number; email: string };
        user: { id: number; email: string };
    }
}

export default fp(async (fastify: FastifyInstance) => {
    await fastify.register(jwt, {
        secret: config.JWT_SECRET,
        sign: {
            expiresIn: '7d',
        },
    });

    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.status(401).send({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Invalid or missing authentication token',
            });
        }
    });
});
