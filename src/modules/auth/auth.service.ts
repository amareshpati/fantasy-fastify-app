import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { z } from 'zod';
import prisma from '../../shared/db/prisma.js';
import { hashPassword, verifyPassword } from '../../shared/utils/password.js';
import type { registerSchema, loginSchema } from './auth.schema.js';

type RegisterBody = z.infer<typeof registerSchema.body>;
type LoginBody = z.infer<typeof loginSchema.body>;

export const register = (fastify: FastifyInstance) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { email, name, password } = request.body as RegisterBody;

        try {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return reply.status(409).send({
                    statusCode: 409,
                    error: 'Conflict',
                    message: 'A user with this email already exists',
                });
            }

            // Hash password and create user
            const hashedPassword = await hashPassword(password);
            const user = await prisma.user.create({
                data: { email, ...(name != null ? { name } : {}), password: hashedPassword },
                select: { id: true, email: true, name: true },
            });

            // Generate JWT
            const token = fastify.jwt.sign({ id: user.id, email: user.email });

            return reply.status(201).send({
                message: 'User registered successfully',
                token,
                user,
            });
        } catch (error) {
            request.log.error(error);
            return reply.status(500).send({ error: 'Registration failed' });
        }
    };

export const login = (fastify: FastifyInstance) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { email, password } = request.body as LoginBody;

        try {
            // Find user by email
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return reply.status(401).send({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Invalid email or password',
                });
            }

            // Verify password
            const isValid = await verifyPassword(password, user.password);
            if (!isValid) {
                return reply.status(401).send({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Invalid email or password',
                });
            }

            // Generate JWT
            const token = fastify.jwt.sign({ id: user.id, email: user.email });

            return reply.send({
                message: 'Login successful',
                token,
                user: { id: user.id, email: user.email, name: user.name },
            });
        } catch (error) {
            request.log.error(error);
            return reply.status(500).send({ error: 'Login failed' });
        }
    };


