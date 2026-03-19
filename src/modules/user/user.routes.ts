import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getUserDetailsSchema } from "./user.schema.js";
import { getUserDetails } from "./user.service.js";

const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.get('/users/user-details', {
        schema: getUserDetailsSchema,
        preHandler: [fastify.authenticate],
    }, getUserDetails);
}

export default userRoutes;