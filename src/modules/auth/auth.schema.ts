export const registerSchema = {
    tags: ['Auth'],
    description: 'Register a new user account',
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            name: { type: 'string', minLength: 2, example: 'John Doe' },
            password: { type: 'string', minLength: 6, example: 'secureP@ss123' },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                        name: { type: 'string', nullable: true },
                    },
                },
            },
        },
        409: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

export const loginSchema = {
    tags: ['Auth'],
    description: 'Login with email and password',
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', example: 'secureP@ss123' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                        name: { type: 'string', nullable: true },
                    },
                },
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


