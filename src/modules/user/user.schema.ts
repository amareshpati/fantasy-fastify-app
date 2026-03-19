import { z } from 'zod';

export const getUserDetailsSchema = {
    tags: ['Users'],
    description: 'Get user details',
    security: [{ bearerAuth: [] }],
    response: {
        200: z.object({
            id: z.number(),
            email: z.string().email(),
            name: z.string().nullable().optional(),
            createdAt: z.string().datetime().optional(), // Prisma sometimes returns Date objects, Fastify serializes to ISO string
        }),
        401: z.object({
            statusCode: z.number(),
            error: z.string(),
            message: z.string(),
        }),
    },
};
