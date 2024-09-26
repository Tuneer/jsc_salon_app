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
        const [rows] = await db.query('SELECT * FROM merchants');
        res.status(200).json(rows);
    } else if (req.method === 'POST') {
        const { name, email } = req.body;
    
        try {
          const [result] = await db.query(
            'INSERT INTO merchants (name, email) VALUES (?, ?)',
            [name, email]
          );
          res.status(200).json({ success: true, merchantId: result });
        } catch (error) {
          res.status(500).json({ success: false, message: 'Failed to add merchant' });
        }
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
}
