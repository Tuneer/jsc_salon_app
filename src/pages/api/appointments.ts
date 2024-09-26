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
    if (req.method === 'POST') {
        const { service_id, customer_id, merchant_id, employee_id, appointment_date, coupon_code } = req.body;

        // Fetch service price
        const [serviceRows] = await db.query('SELECT base_price FROM services WHERE id = ?', [service_id]);
        const basePrice = serviceRows[0].base_price;

        // Fetch applicable coupon
        const [couponRows] = await db.query('SELECT * FROM coupons WHERE code = ? AND merchant_id = ? AND NOW() BETWEEN start_date AND end_date', [coupon_code, merchant_id]);
        const discount = couponRows.length > 0 ? (couponRows[0].discount_percentage / 100) * basePrice : 0;

        // Calculate final price
        const finalPrice = basePrice - discount;

        // Insert appointment
        const [result] = await db.query('INSERT INTO appointments (service_id, customer_id, merchant_id, employee_id, appointment_date, final_price) VALUES (?, ?, ?, ?, ?, ?)',
            [service_id, customer_id, merchant_id, employee_id, appointment_date, finalPrice]);

        res.status(201).json({ id: result });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
