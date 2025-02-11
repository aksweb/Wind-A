// src/config/db.config.js
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const executeQuery = async (query, params = []) => {
    try {
        const result = await sql.query(query, params);
        return result;
    } catch (error) {
        console.error('Database Query Error:', error);
        throw error;
    }
};
const testConnection = async () => {
    try {
        const result = await sql`SELECT version()`;
        console.log('Successfully connected to Neon Database');
        console.log('PostgreSQL version:', result[0].version);
        return true;
    } catch (error) {
        console.error('Database Connection Error:', error);
        throw error;
    }
};

module.exports = {
    sql,
    executeQuery,
    testConnection
};
