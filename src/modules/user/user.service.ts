import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../shared/db/prisma.js';



export const getUserDetails = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.user;

        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, createdAt: true },
        });

        if (!user) {
            return reply.status(404).send({
                statusCode: 404,
                error: 'Not Found',
                message: 'User not found',
            });
        }

        return user;
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Failed to fetch user profile' });
    }
};

