import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma.js';
import { config } from '../config/env.js';

export const getHealth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // 1. Try a simple query to check connection
        await prisma.$queryRaw`SELECT 1`;

        // 2. Create a log entry
        const logEntry = await prisma.apiLogger.create({
            data: {
                message: 'Health check performed: Database is connected',
                level: 'info'
            }
        });

        return {
            status: 'success',
            message: 'Database is connected!',
            log_id: logEntry.id,
            timestamp: logEntry.timestamp
        };
    } catch (error: any) {
        request.log.error('Database connection error:', error);

        return reply.status(500).send({
            status: 'error',
            message: 'Database connection failed',
            error: config.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
