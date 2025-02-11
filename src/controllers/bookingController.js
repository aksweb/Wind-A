const { sql } = require('../config/config');
const bookSeat = async (req, res) => {
    const { train_id, seat_numbers } = req.body;
    const userId = req.user.userId;
    if (!train_id || !seat_numbers || !Array.isArray(seat_numbers) || seat_numbers.length === 0) {
        return res.status(400).json({ message: 'Train ID and seat numbers are required.' });
    }
    try {
        const bookingResults = [];

        for (const seat_number of seat_numbers) {
            try {
                const existingBooking = await sql`
                    SELECT id FROM Bookings
                    WHERE train_id = ${train_id} AND seat_number = ${seat_number} AND status = 'confirmed';
                `;

                if (existingBooking.length > 0) {
                    console.log(`Seat ${seat_number} is already booked.`);
                    bookingResults.push({ seat_number, status: 'unavailable', message: 'Seat is already booked.' });
                } else {
                    const result = await sql`
                        INSERT INTO Bookings (train_id, user_id, seat_number, status)
                        VALUES (${train_id}, ${userId}, ${seat_number}, 'confirmed')
                        RETURNING id;
                    `;

                    console.log(`Seat ${seat_number} booked successfully. Booking ID: ${result[0].id}`);
                    bookingResults.push({ seat_number, status: 'booked', booking_id: result[0].id });
                }
            } catch (error) {
                console.error(`Error processing seat ${seat_number}:`, error);
                bookingResults.push({ seat_number, status: 'error', message: 'Failed to process seat.' });
            }
        }
        const successfulBookings = bookingResults.filter(result => result.status === 'booked');
        if (successfulBookings.length === 0) {
            return res.status(409).json({ message: 'No seats were booked.', details: bookingResults });
        }
        res.status(201).json({
            message: 'Seat booking process completed.',
            details: bookingResults,
        });
    } catch (error) {
        console.error('Error booking seats:', error);
        res.status(500).json({ message: 'Failed to book seats.' });
    }
};
const getUserBookings = async (req, res) => {
    const userId = req.user.userId;
    try {
        const bookings = await sql`
            SELECT id, train_id, seat_number, booking_time, status
            FROM Bookings
            WHERE user_id = ${userId}
            ORDER BY booking_time DESC;
        `;

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user.' });
        }

        res.status(200).json({
            message: 'Bookings retrieved successfully',
            bookings: bookings,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings.' });
    }
};

module.exports = { bookSeat, getUserBookings };