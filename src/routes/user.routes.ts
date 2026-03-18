import type { FastifyInstance } from 'fastify';
import { getUsers, createUser } from '../controllers/user.controller.js';
import { getUsersSchema, createUserSchema } from '../schemas/user.schema.js';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', {
        schema: getUsersSchema,
    }, getUsers);

    fastify.post('/users', {
        schema: createUserSchema,
    }, createUser);
}
