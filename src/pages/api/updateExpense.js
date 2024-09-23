import mongodb from '../../lid/mongodb';
import Expense from '../../models/Expenses';
const handler = async (req, res) => {
    await mongodb();
  
    if (req.method === 'PUT') {
      const { id, ...updateData } = req.body;
  
      try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedExpense);
      } catch (error) {
        res.status(400).json({ message: 'Error updating expense', error });
      }
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
  export default handler;