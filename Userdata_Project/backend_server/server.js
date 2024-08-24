import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import cors from 'cors'



const app = express()
const port = 8000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

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
    password: { type: String, required: true },
    role:{ type: String, require: true}
});

const User = mongoose.model('useraccoutdatas', userSchema)


const authenticationAdmin = (req, res, next)=>{
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, secret);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'Invalid token or access denied' });
    }
}
const authAllUser = (req, res, next) =>{
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'Invalid token or access denied' });
    }

}

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
            password: hashedPassword,
            role: 'user'
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
       
       const userRole = getuserData.role

       const token = jwt.sign({ userId: getuserData._id, role:userRole }, secret, { expiresIn: '1h' });

       res.json({
            token,
            role: userRole
       })
       
       
       
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' });
    }


})

app.get('/loadAll', authenticationAdmin, async(req, res) =>{
    try {
        const userData = await User.find()
        res.json({
            userData
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' });
    }
})
app.get('/loadSelf', authAllUser, async(req, res) =>{
    try {
        const userData  = await User.findById(req.user.userId)
        if(!userData){
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({
            userData
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: 'Server error' });
    }
})  



app.listen(port, (req,res) =>{
    connectiondb()
    console.log(`http://localhost:${port}`)
})



