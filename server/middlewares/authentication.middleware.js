require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const authentication = async (req, res, next) => {

    try {
        const token = (req.headers.authorization).includes('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
        
        const decoded = jwt.verify(token,JWT_SECRET_KEY)
       if(decoded){
        req.body.userID = decoded.userID;
        next()
       }
       else return res.status(400).json({message : "login frist"})
    } catch (error) {
        res.status(400).json({error :  'Not authorized to perfrome this action'})
    }
}

module.exports = authentication;