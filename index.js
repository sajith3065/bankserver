// to import env file
require('dotenv').config()


// server creation

// To import Express
const express=require('express')
const router = require('./routes/router')
const cors=require('cors')

// create Server using express
const server=express()

// integrate front-end
server.use(cors())

// to convert all incomming json data to jS data
server.use(express.json())

// router set
server.use(router)



// import connection.js
require('./database/connection')

// run server
// set port
const port=5001 || process.env.port


// to make run the server
server.listen(port,()=>{
    console.log(`_______ server started at port number ${port}_______`);
})


// // api calls resolve post
// server.post('/register',(req,res)=>{
//     res.send("post method Working")
// })

// server.post('/login', (req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);
//     res.send("Login worked")
// })

