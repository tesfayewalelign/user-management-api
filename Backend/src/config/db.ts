import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(' Connected to MySQL Database');
        connection.release();
    } catch (err) {
        console.error(' Failed to connect to MySQL:', (err as Error).message);
        process.exit(1);
    }
})();
