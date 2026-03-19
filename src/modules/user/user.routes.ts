import type { FastifyInstance } from "fastify";
import { createUserSchema, getUsersSchema } from "./user.schema.js";
import { createUser, getUsers } from "./user.service.js";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', {
        schema: getUsersSchema,
    }, getUsers);

    fastify.post('/users', {
        schema: createUserSchema,
    }, createUser);
}