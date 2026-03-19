import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../shared/db/prisma.js';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Database connection failed' });
    }
};

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, name } = request.body as { email: string; name: string };
    try {
        const user = await prisma.user.create({
            data: { email, name },
        });
        return user;
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Could not create user' });
    }
};
