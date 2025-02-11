const { sql } = require('../config/db.config');
class UserModel {
    static async createUser(username, email, password, role = 'user') {
        try {
            const result = await sql`
                INSERT INTO users (username, email, password, role)
                VALUES (${username}, ${email}, ${password}, ${role})
                RETURNING id, username, email, role
            `;
            return result[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    static async findByEmail(email) {
        try {
            const result = await sql`
                SELECT * FROM users 
                WHERE email = ${email}
            `;
            return result[0];
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }
}
module.exports = UserModel;