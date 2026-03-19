import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
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
