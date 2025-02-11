require('dotenv').config({ path: '../../.env' });
const path = require('path');
const fs = require('fs').promises;
const { sql } = require('../config/config');

const runMigrations = async () => {
    try {
        const testResult = await sql`SELECT NOW()`;
        console.log('Database connected successfully');
        const migrationsDir = path.join(__dirname, 'migrations');
        const files = await fs.readdir(migrationsDir);
        const migrationFiles = files
            .filter(f => f.endsWith('.js'))
            .sort();

        for (const file of migrationFiles) {
            console.log(`Running migration: ${file}`);
            const migration = require(path.join(migrationsDir, file));
            await migration.up();
        }
        console.log('All migrations completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
};

// Run migrations
runMigrations();