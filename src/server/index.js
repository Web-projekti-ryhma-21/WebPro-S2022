const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')


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
app.listen(port)