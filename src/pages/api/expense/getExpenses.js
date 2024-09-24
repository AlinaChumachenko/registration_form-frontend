import mongodb from '../../../lid/mongodb';
import Expense from '../../../models/Expenses';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
  await mongodb();

  if (req.method === 'GET') {
    // Проверка авторизации пользователя
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id; // Извлекаем userId из токена

      // Получение расходов только для текущего пользователя
      const expenses = await Expense.find({ userId }); // Фильтруем по userId
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expenses', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

