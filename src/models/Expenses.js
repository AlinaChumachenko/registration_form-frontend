import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);