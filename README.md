# Expense Tracker !

A full-stack expense management application that allows users to **track expenses, add & delete transactions, and export reports to PDF**.

## 🚀 Tech Stack

### **Frontend**
- React.js
- React Router
- Axios
- CSS 

### **Backend**
- Node.js (Express.js)
- Knex.js (Query Builder)
- Express.js
- Bcrypt
- PostgreSQL (Hosted on Render)

### **Database**
- PostgreSQL
- Knex for database migrations & queries

### **Deployment**
- DB : Render
- client : Render
- server : Render

### **Features**

- ✅ User Authentication
- ✅ Expense Management (Add, Delete, List)
- ✅ Export Expenses as PDF
- ✅ Responsive UI

---

## 📌 API Endpoints 

### **PostMan Collection** 
import the postman collection in postman to test apis
```
ExpenseTracker_fullstack/server/apis/ExpenseTracker.postman_collection.json

``````
----


# 📌 How to Run Locally

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/07-Mayankraj/ExpenseTracker_fullstack.git
cd ExpenseTracker_fullstack
```

### **2️⃣ Set Up Backend**
```sh
  cd server
  npm i 
```

### **3️⃣ Set Up Environment Variables (`.env`)**
```env
DATABASE_URL=your_postgresql_url 
JWT_SECRET=your_secret_key
PORT=8080
```
- ### use testing purposes only || create .env in root and paste below creds
```env
DATABASE_URL = postgresql://expensetracker_o6lh_user:5J1JfPkVLOF2GilQCmZvMHKVwkm7uTZE@dpg-cv0ck9l2ng1s73el50rg-a.oregon-postgres.render.com/expensetracker_o6lh
PORT = 8080
JWT_SECRET_KEY = test
```


### **4️⃣ Run the Backend Server**
```sh
npm start
```
#📌 **Server will start at:** `http://localhost:8080`

### **5️⃣ Start the Frontend**
- change the `API_URL` in the frontend   `client/src/services/api.js` for making api calls
```sh
cd client
npm install
npm run dev
```
📌 **Frontend will run at:** `http://localhost:5173`

