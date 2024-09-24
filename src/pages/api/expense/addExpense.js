import mongodb from '../../../lid/mongodb';
import Expense from '../../../models/Expenses';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
  await mongodb();

  if (req.method === 'POST') {
    // Проверка авторизации пользователя
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id; // Получаем userId из токена

      // Создание нового расхода с привязкой к userId
      const expense = new Expense({ ...req.body, userId });
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ message: 'Error saving expense', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;