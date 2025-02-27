import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getExpenses, pdfSummary } from "../services/api";
import ExpenseForm from "./ExpenseForm";
import { deleteExpense } from "../../../client/src/services/api";
import toast from "react-hot-toast";
const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    let fetchExpenses = async () => {
        try {
            const res = await getExpenses(user.token || user.Token);
            setExpenses(res.data);

            // Calculate total income and expenses
            let income = 0,
                expense = 0;
            res.data.forEach((item) => {
                if (item.category === "Income") income += Number(item.amount);
                else expense += Number(item.amount);
            });
            setTotalIncome(income);
            setTotalExpense(expense);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };
    useEffect(() => {
        if (user) {
            fetchExpenses();
        }
        // eslint-disable-next-line
    }, [user]);

    // Handle delete action
    const handleDelete = async (expenseId) => {
        // if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
            await deleteExpense(user.token || user.Token, expenseId);
            fetchExpenses(); // Refresh the list after deletion
            toast.success('Record deleted')
        } catch (err) {
            toast.error("Failed to delete expense.");
        }
    };

    return user ? (

        <div >

            <h2 className="greetUsers">Welcome, {user?.name}!</h2>

            <div className="top-section">
                <div className="expenseForm ">

                    <ExpenseForm onExpenseAdded={fetchExpenses} />
                </div>
                <div className="top-section-summary ">
                    <div className="">
                        
                        <h3>Total Income  : {totalIncome}</h3>
                        <h3>Total Expenses : {totalExpense}</h3>
                    </div>


                    <div className="top-section-div-buttons ">
                        <button onClick={() => pdfSummary(user.Token || user.token)}>Export to PDF</button>
                        <button onClick={logout}>Logout</button>
                    </div>

                </div>


            </div>

            <div className="expenseslist">

                <h3 >Expense List</h3>
            </div>
            <div className="tableDiv">
                <table border="0">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((exp) => (
                            <tr key={exp.id}>
                                <td>{exp.description}</td>
                                <td >{exp.category}</td>
                                <td>₹{exp.amount}</td>
                                <td>
                                    <button id="deleteButton" onClick={() => handleDelete(exp.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="footer">
                <h3>Note: Click on 'Delete' to remove an expense from your list.</h3>
                <h3>Click on 'Export to PDF' to generate a summary of your expenses in a PDF file.</h3>
            </div>
        </div>
    ) : (<div className="loginFirst"> <h1>Login first, to access the dashboard</h1></div>)
};

export default Dashboard;
