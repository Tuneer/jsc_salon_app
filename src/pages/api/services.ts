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
        const { merchant_id } = req.query;
        const [rows] = await db.query('SELECT * FROM services WHERE merchant_id = ?', [merchant_id]);
        res.status(200).json(rows);
    } else if (req.method === 'POST') {
        const { name, price, merchantId } = req.body;
    
        try {
          await db.query(
            'INSERT INTO services (name, price, merchant_id) VALUES (?, ?, ?)',
            [name, price, merchantId]
          );
          res.status(200).json({ success: true });
        } catch (error) {
          res.status(500).json({ success: false, message: 'Failed to add service' });
        }
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
}
