import mongodb from '../../../lid/mongodb';
import Expense from '../../../models/Expenses';

const handler = async (req, res) => {
  await mongodb();

  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting expense', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;