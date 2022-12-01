const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')
const { useResolvedPath } = require('react-router-dom')


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port = 3001
app.get("/globalannual",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM globalannual')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/northernhemisphereannual",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM northernhemisphereannual')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/southernhemisphereannual",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM southernhemisphereannual')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/globalmonthly",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM globalmonthly')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/northernhemispheremonthly",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM northernhemispheremonthly')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/southernhemispheremonthly",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM southernhemispheremonthly')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.post('/register',
        (req, res) => {

  const salt = bcrypt.genSaltSync(6);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    password: hashedPassword
  }
  users.push(newUser);
  console.log(users);
  res.send("OK");

  console.log(hashedPassword);
  users.addUser(req.body.username, hashedPassword);

});

app.listen(port)