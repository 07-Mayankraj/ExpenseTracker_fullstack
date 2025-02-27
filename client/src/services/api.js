import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://expensetracker-fullstack-p5e3.onrender.com";

export const register = async (name, email, password) => {
  return axios.post(`${API_URL}/users/register`, { name, email, password });
};

export const login = async (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export const getExpenses = async (token) => {
  return axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addExpense = async (token, expense) => {
  return axios.post(`${API_URL}/expenses/add`, expense, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteExpense = async (token, expenseId) => {
  return axios.delete(`${API_URL}/expenses/${expenseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const pdfSummary = async (token) => {
  let response = await fetch(`${API_URL}/expenses/export`, {
    method : "GET" ,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    toast.error("Failed to download PDF")
    throw new Error("Failed to download PDF");
  }

  // Read response as blob
  const blob = await response.blob();

  // Create a temporary URL for the file
  const url = window.URL.createObjectURL(blob);

  // Create a hidden <a> element and trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.pdf"; // Filename
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast.success("Report exported successfully");
  return

};
