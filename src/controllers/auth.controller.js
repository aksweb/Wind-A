const AuthService = require('../services/auth.service');
class AuthController {
    static async register(req, res, next) {
        try {
            const userData = req.body;
            console.log(userData);

            const user = await AuthService.registerUser(userData);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.loginUser(email, password);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = AuthController;