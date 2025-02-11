require('dotenv').config({ path: '../../.env' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

const sql = neon(process.env.DATABASE_URL);

module.exports = { sql };