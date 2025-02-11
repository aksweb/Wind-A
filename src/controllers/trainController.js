const { sql } = require('../config/config');

const addTrain = async (req, res) => {
    const { train_name, total_seats, start_station, end_station } = req.body;

    console.log("ROLE: ", req.user.role);
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can add trains' });
    }
    try {
        const result = await sql`
            INSERT INTO Trains (train_name, total_seats, start_station, end_station)
            VALUES (${train_name}, ${total_seats}, ${start_station}, ${end_station})
            RETURNING id;
        `;
        res.status(201).json({
            message: 'Train added successfully',
            train_id: result[0].id,
        });
    } catch (error) {
        console.error('Error adding train:', error);
        res.status(500).json({ message: 'Failed to add train' });
    }
};

const getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ message: 'Source and destination are required.' });
    }
    try {
        const trains = await sql`
            SELECT 
                Trains.id AS train_id,
                Trains.train_name,
                Trains.total_seats,
                COUNT(Bookings.id) AS booked_seats,
                Trains.total_seats - COUNT(Bookings.id) AS available_seats
            FROM Trains
            LEFT JOIN Bookings 
                ON Trains.id = Bookings.train_id 
                AND Bookings.status = 'confirmed'
            WHERE 
                Trains.start_station = ${source} 
                AND Trains.end_station = ${destination}
            GROUP BY Trains.id;
        `;
        if (trains.length === 0) {
            return res.status(404).json({ message: 'No trains found for the given route.' });
        }
        res.status(200).json(trains);
    } catch (error) {
        console.error('Error fetching seat availability:', error);
        res.status(500).json({ message: 'Failed to fetch seat availability.' });
    }
};
module.exports = { addTrain, getSeatAvailability };