import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { config } from '../config/env.js';

export default fp(async (fastify: FastifyInstance) => {

    if (!config.isDevelopment) return

    // Register Swagger (OpenAPI configuration)
    await fastify.register(swagger, {
        openapi: {
            info: {
                title: 'Fantasy Fastify App API',
                description: 'API documentation for the Fantasy Fastify App',
                version: '1.0.0',
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        transform: jsonSchemaTransform,
    });

    // Register Swagger UI
    await fastify.register(swaggerUi, {
        routePrefix: '/api-docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    });
});
