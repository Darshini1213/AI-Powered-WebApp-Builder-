import jwt from 'jsonwebtoken';
const getSecret = () => {
    if (!process.env.JWT_SECRET) {
        console.error("https://github.com/Darshini1213 JWT_SECRET is missing in environment variables");
        throw new Error("JWT_SECRET is not defined");
    }
    return process.env.JWT_SECRET;
};

export const generateToken = (user) => {
    try {
        const payload = {
            id:user.id,
            email: user.email,
        };

        const secret = getSecret();

        return jwt.sign(payload, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        });

    } catch (error) {
        console.error("Error generating token:", error.message);
        throw error;
    }
};

export const verifyToken = (token) => {
    try {
        const secret = getSecret();
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw error;
    }
};