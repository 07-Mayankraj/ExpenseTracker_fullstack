const db = require('../configs/db'); // Knex instance
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
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

exports.exportExpensesPDF = async (req, res) => {
  try {
    const userId = req.body.userID;

    // Fetch user expenses
    const expenses = await db('expenses')
      .where({ user_id: userId })
      .select('amount', 'category', 'description', 'created_at');

    if (!expenses.length) {
      return res.status(404).json({ error: 'No expenses found' });
    }

    // Create a PDF document
    const doc = new PDFDocument({ margin: 10 });
    const filePath = path.join(__dirname, `../expenses-${userId}.pdf`);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add Title
    doc.fontSize(20).text('Expense Report', { align: 'center' }).moveDown(2);

    // Table Headers
    doc.fontSize(12).text('Amount', 50, doc.y);
    doc.text('Category', 150, doc.y);
    doc.text('Description', 300, doc.y);
    doc.text('Date', 500, doc.y);
    doc.moveDown(0.1).stroke();

    // Add Expenses Data
    expenses.forEach((expense) => {
      doc.text(Number(expense.amount).toFixed(2), 50, doc.y);
      doc.text(expense.category, 150, doc.y);
      doc.text(expense.description || 'N/A', 300, doc.y);
      doc.text(new Date(expense.created_at).toLocaleDateString(), 500, doc.y);
      doc.moveDown(0.1);
    });

    // Summary
    const totalIncome = expenses
      .filter(e => e.category === 'Income')
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalExpense = expenses
      .filter(e => e.category === 'Expense')
      .reduce((sum, e) => sum + Number(e.amount), 0);

    doc.moveDown(1).fontSize(10).text(`Total Income: ₹${Number(totalIncome).toFixed(2)}`, { align: 'left' });
    doc.text(`Total Expenses: ₹${Number(totalExpense).toFixed(2)}`, { align: 'left' });

    // Finalize the document
    doc.end();

    // Wait for PDF file creation
    stream.on('finish', () => {
      res.sendFile(filePath, `expenses-${userId}.pdf`);
    });

  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF file' });
  }
};