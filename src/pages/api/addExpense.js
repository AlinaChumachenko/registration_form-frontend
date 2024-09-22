import mongodb from '../../lid/mongodb';
import Expense from '../../models/Expenses';

const handler = async (req, res) => {
  await mongodb();

  if (req.method === 'POST') {
    try {
      const expense = new Expense(req.body);
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