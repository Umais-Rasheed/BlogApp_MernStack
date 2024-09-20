const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json()); 
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser())
app.use(express.static('public'))

// connection to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blog')
.then(() => console.log("MongoDB connected"))
.catch();

// token verification
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Token is wrong")
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next()
            }
        })
    }
}

app.get('/home', verifyUser, (req, res) => {
    return res.json({email: req.email, username: req.username})
})

// register
app.post('/register', (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({username, email, password: hash})
        .then(user => res.json(user))
        .catch(err => res.json(err));
    }).catch(err => console.log(err))
});

// login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({email: user.email, username: user.username}, 
                        "jwt-secret-key", {expiresIn:"1d"})
                    res.cookie("token", token);
                    return res.json("Success")
                } else {
                    return res.json("The password is fail")
                }
             })  
        } else {
            return res.json("No record existed");
        }
    })
    .catch(err => res.json(err));
});

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        
    }
})

const upload = multer({
    storage: storage
})

// createPost
app.post('/create', verifyUser, upload.single('file'), (req, res) => {
    // console.log(req.file)
    PostModel.create({title: req.body.title,
        description: req.body.description,
        file: req.file.filename, email: req.body.email})
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
} )

// getPost data
app.get('/getposts', (req, res) => {
    PostModel.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

// getpostbyID
app.get('/getpostbyid/:id', (req, res) => {
    const id = req.params.id
    PostModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

// updatepost
app.put('/editpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate(
    {_id: id}, {
        title: req.body.title,
        description: req.body.description}
        ).then(result => res.json("Success"))
            .catch(err => res.json(err))
})

// delete
app.delete('/deletepost/:id', (req, res) => {
    PostModel.findByIdAndDelete({_id: req.params.id})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
})

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json("Success")
})

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
