const db = require("../configs/db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exitingUser = await db('users').where({email})
        if(exitingUser.length > 0) {
            return res.status(400).json({ err: "Email already registered !" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err.message })
            }
            else {
                const user = { name, email, password: hash }
                await db('users').insert(user).returning('*');

                res.status(200).json({ msg: "user registred successfully" })
            }
        })
    } catch (error) {
        console.log({error});
        res.status(500).send(error);
    }
}



exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exitingUser = await db('users').where({email})
        console.log({exitingUser});
        if (exitingUser.length !== 0) {
            //  compare password
            bcrypt.compare(password, exitingUser[0].password,(err,success) => {
                if(success){
                    const token = jwt.sign({ userID: exitingUser[0].id ,email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
                    // token sent
                    res.json({ "message": "login success", "Token" : token , "name" : exitingUser[0].name })
                }else{
                     res.status(403).json({"message": "Invalid Credentials" })
                }
            })
        }
        else{
            res.status(403).send('Wrong credentails')
        }
    } catch (error) {
        console.log({error});
        res.status(403).json({error : error.message })
    }
}

