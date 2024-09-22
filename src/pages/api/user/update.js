import mongodb from '../../../lid/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await mongodb();

  try {
    const { email, newEmail, name } = req.body;
    // const { email, newEmail, name } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   user.name = name || user.name;

     if (newEmail && newEmail !== email) {
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      user.email = newEmail;
    }

    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};