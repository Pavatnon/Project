import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'


const app = express()
const port = 8000

app.use(express.json())

const uri = "mongodb+srv://pavatnon:drakzone123@cluster0.h12he.mongodb.net/userdatabase?retryWrites=true&w=majority"

const secret = 'pavatnon'
let conn = null
const connectiondb = async()=>{
    try {   
        conn = await mongoose.connect(uri)
        
    } catch (error) {
        console.log(error);
    }
}


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('useraccoutdatas', userSchema)

app.post('/register', async (req, res) =>{
    try{
        const {username, password} = req.body
    
        
        const usernameCheck = await User.findOne({
            username
        })
        if(usernameCheck){
            return res.json({
                message: 'username wrong!'
            })
        }



        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()
    
        res.json({
            message: 'register success'
        })

    }catch(err){
        console.log(err)
        res.json({
            message: err.message
        })
    }

    
})

app.post('/login', async(req, res) =>{
    try {
       const loginUer = {
            username: req.body.username,
            password: req.body.password
       }

       const getuserData = await User.findOne({username: loginUer.username})

       if(!getuserData){
        return res.status(400).json({
            message: 'username is not found'
        })
       }

       const matchPassword = await bcrypt.compare(loginUer.password, getuserData.password)

       if(!matchPassword){
            return res.status(400).json({
                message: 'password is wrong!'
            })
       }

       const token = jwt.sign({ userId: getuserData._id }, secret, { expiresIn: '1h' });

       res.json({
            token
       })
       
       
       
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' });
    }


})



app.listen(port, (req,res) =>{
    connectiondb()
    console.log(`http://localhost:${port}`)
})



