export const createUserSchema = {
    body: {
        type: 'object',
        required: ['email', 'name'],
        properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string', minLength: 2 }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' }
            }
        }
    }
};

export const getUsersSchema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    email: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' }
                }
            }
        }
    }
};
