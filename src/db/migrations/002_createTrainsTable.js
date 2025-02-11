const { sql } = require('../../config/config');

const up = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS Trains (
                id SERIAL PRIMARY KEY,
                train_name VARCHAR(255) NOT NULL,
                total_seats INT NOT NULL,
                start_station VARCHAR(255) NOT NULL,
                end_station VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Trains table created successfully');
    } catch (error) {
        console.error('Error creating Trains table:', error);
        throw error;
    }
};

const down = async () => {
    try {
        await sql`DROP TABLE IF EXISTS Trains;`;
        console.log('Trains table dropped successfully');
    } catch (error) {
        console.error('Error dropping Trains table:', error);
        throw error;
    }
};

module.exports = { up, down };