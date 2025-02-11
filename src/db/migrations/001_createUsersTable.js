
const { sql } = require('../../config/config');

const up = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating users table:', error);
        throw error;
    }
};

const down = async () => {
    try {
        await sql`DROP TABLE IF EXISTS users;`;
        console.log('Users table dropped successfully');
    } catch (error) {
        console.error('Error dropping users table:', error);
        throw error;
    }
};

module.exports = { up, down };