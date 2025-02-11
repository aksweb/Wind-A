const { sql } = require('../../config/config');

const up = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS Bookings (
                id SERIAL PRIMARY KEY,
                train_id INT REFERENCES Trains(id) ON DELETE CASCADE,
                user_id INT NOT NULL, -- Assuming you have a Users table
                seat_number INT NOT NULL,
                booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) NOT NULL CHECK (status IN ('confirmed', 'cancelled'))
            );
        `;
        console.log('Bookings table created successfully');
    } catch (error) {
        console.error('Error creating Bookings table:', error);
        throw error;
    }
};

const down = async () => {
    try {
        await sql`DROP TABLE IF EXISTS Bookings;`;
        console.log('Bookings table dropped successfully');
    } catch (error) {
        console.error('Error dropping Bookings table:', error);
        throw error;
    }
};

module.exports = { up, down };