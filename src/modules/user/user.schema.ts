

export const getUserDetailsSchema = {
    tags: ['Users'],
    description: 'Get user details',
    security: [{ bearerAuth: [] }],
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                email: { type: 'string' },
                name: { type: 'string', nullable: true },
                createdAt: { type: 'string', format: 'date-time' },
            },
        },
        401: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

