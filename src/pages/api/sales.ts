import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Create a connection pool
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { merchant_id, start_date, end_date } = req.query;

    try {
      // Fetch sales data for the provided merchant and date range
      const [rows] = await db.query(
        `SELECT * FROM sales WHERE merchant_id = ? AND sale_date BETWEEN ? AND ?`,
        [merchant_id, start_date, end_date]
      );
      res.status(200).json(rows);  // Send the fetched data back to the frontend
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sales data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
