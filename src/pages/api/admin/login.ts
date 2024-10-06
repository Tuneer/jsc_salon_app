import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken'; // Import JWT library

// Create a connection pool
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Use a secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM `salon`.admins WHERE email = ?', [email]);
     
      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const admin = rows[0];
      console.log(admin.password)
      console.log(password)
      const pass = await bcrypt.hash(admin.password,16)
      const isMatch = await bcrypt.compare(password, pass);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      const customObject = {
        success: true,
        emailID: admin.email,
      };

      // Generate a JWT token
      const tokenAs = jwt.sign(
        {
          id: admin.id,
          role: admin.role,
          merchantId: admin.merchant_id || null,
          email: admin.email,
        },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );


      // If credentials are valid, you can use JWT for session management
      res.status(200).json({success: true, emailID: admin.email,role: admin.role,token:tokenAs});
    } catch (error) {
      console.error('Login error:', error); // Log error to see the full stack trace
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
