const { sql } = require('../../config/config');

const up = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS TrainStops (
                id SERIAL PRIMARY KEY,
                train_id INT REFERENCES Trains(id) ON DELETE CASCADE,
                station_id INT REFERENCES Stations(id) ON DELETE CASCADE,
                arrival_time TIME,
                departure_time TIME,
                sequence INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(train_id, station_id)
            );
        `;
        console.log('TrainStops table created successfully');
    } catch (error) {
        console.error('Error creating TrainStops table:', error);
        throw error;
    }
};

const down = async () => {
    try {
        await sql`DROP TABLE IF EXISTS TrainStops;`;
        console.log('TrainStops table dropped successfully');
    } catch (error) {
        console.error('Error dropping TrainStops table:', error);
        throw error;
    }
};

module.exports = { up, down };