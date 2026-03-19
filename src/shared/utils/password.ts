import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hash a plaintext password using bcrypt.
 */
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plaintext password against a bcrypt hash.
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
