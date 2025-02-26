require('dotenv').config()
const express = require("express");
const cors = require("cors");
const db = require("./configs/db");
const userRoute = require('./routes/users.route');
const expenseRouter = require('./routes/expenses.route');
const authentication = require('./middlewares/authentication.middleware');

const app = express();



// middlewares
app.use(cors());
app.use(express.json());

// routers
app.get('/',(req,res)=>res.send('homeroute Of backend'))
app.use('/users',userRoute)
app.use(authentication)
app.use('/expenses',expenseRouter)


app.listen(process.env.PORT,async()=>{
    try {
        db; // db intialization
        console.log("sever runnign at port " +  process.env.PORT);
    } catch (error) {
        console.log({err : error.message})
    }
})