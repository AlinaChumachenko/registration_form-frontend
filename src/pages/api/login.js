import connectDb from '../../lid/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb();

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const user = await User.findOne({ email });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({        
        user,
        message: 'User logged in successfully',
        token,
      });
    } catch (error) {
      console.error('User login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
