import { z } from 'zod';

export const registerSchema = {
    tags: ['Auth'],
    description: 'Register a new user account',
    body: z.object({
        email: z.string().email().describe('user@example.com'),
        name: z.string().min(2).optional().describe('John Doe'),
        password: z.string().min(6).describe('secureP@ss123'),
    }),
    response: {
        201: z.object({
            message: z.string(),
            token: z.string(),
            user: z.object({
                id: z.number(),
                email: z.string().email(),
                name: z.string().nullable().optional(),
            }),
        }),
        409: z.object({
            statusCode: z.number(),
            error: z.string(),
            message: z.string(),
        }),
    },
};

export const loginSchema = {
    tags: ['Auth'],
    description: 'Login with email and password',
    body: z.object({
        email: z.string().email().describe('user@example.com'),
        password: z.string().describe('secureP@ss123'),
    }),
    response: {
        200: z.object({
            message: z.string(),
            token: z.string(),
            user: z.object({
                id: z.number(),
                email: z.string().email(),
                name: z.string().nullable().optional(),
            }),
        }),
        401: z.object({
            statusCode: z.number(),
            error: z.string(),
            message: z.string(),
        }),
    },
};
