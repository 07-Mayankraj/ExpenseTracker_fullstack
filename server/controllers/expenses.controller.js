const db = require('../configs/db'); // Knex instance

exports.addExpense = async (req, res) => {
  try {
    const { userID, amount, category, description } = req.body;
    
    if (!userID || !amount || !category) {
      return res.status(400).json({ error: 'User ID, amount, and category are required' });
    }
    const [expense] = await db('expenses').insert({
      user_id : userID,
      amount,
      category,
      description,
      created_at: new Date()
    }).returning('*');

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await db('expenses').select('*').where({user_id:req.body.userID});
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.body.userID; 

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const deleted = await db('expenses').where({ id,user_id }).del();
    
    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

exports.getExpenseSummary = async (req, res) => {
  try {
    const summary = await db('expenses')
      .select('category')
      .sum('amount as total')
      .groupBy('category');

    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get summary' });
  }
};

