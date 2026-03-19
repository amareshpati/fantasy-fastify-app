import type { FastifyInstance } from "fastify";
import { getUserDetailsSchema } from "./user.schema.js";
import { getUserDetails } from "./user.service.js";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users/user-details', {
        schema: getUserDetailsSchema,
        preHandler: [fastify.authenticate],
    }, getUserDetails);
}