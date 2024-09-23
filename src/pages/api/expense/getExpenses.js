import mongodb from '../../../lid/mongodb';
import Expense from '../../../models/Expenses';

const handler = async (req, res) => {
  await mongodb();

  if (req.method === 'GET') {
    try {
      const expenses = await Expense.find({});
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