import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addExpense } from "../services/api";
import toast from "react-hot-toast";

const ExpenseForm = ({ onExpenseAdded }) => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Expense");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      toast.error('Amount is required')
      return;
    }

    const newExpense = {
      amount: Number(amount),
      category,
      description,
    };

    try {
      await addExpense(user.token || user.Token, newExpense);
      toast.success('Transaction added successfully')
      setAmount("");
      setCategory("Expense");
      setDescription("");
      onExpenseAdded(); // Refresh the expense list
    } catch (err) {
      toast.error("Failed to add expense.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;
