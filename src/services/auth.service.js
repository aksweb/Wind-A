const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model');
const { JWT_SECRET } = require('../config/jwt.config');

class AuthService {
    static async registerUser(userData) {
        const { username, email, password, role } = userData;
        console.log("servicing: ", userData);
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.createUser(
            username,
            email,
            hashedPassword,
            role,
        );
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

    static async loginUser(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        };
    }
}

module.exports = AuthService;