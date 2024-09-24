import connectDb from '../../lid/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';



const getAvatarUrl = (seed) => `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}`;
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb();

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const avatarSeed = uuidv4();

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar: getAvatarUrl(avatarSeed),
      });

      await newUser.save();

      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}