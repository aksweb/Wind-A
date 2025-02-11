const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt.config');

const isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role === 'admin') {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = isAdmin;