const express = require('express')
const cors = require('cors')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
    const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const config = require('./config')
const {v4: uuidv4 } = require('uuid')
const { db } = require('./config')
const bcrypt = require('bcrypt')
const { useResolvedPath } = require('react-router-dom')


const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:false}))

const users = [
    {
        id: 1,
        username: 'testiuser',
        password: '11111'
    },
    {
        id: 2,
        username: 'demouser',
        password: '12345'
    }
]

passport.use(new BasicStrategy(
function(username, password, done) {
    console.log('username ' + username);
    console.log('password ' + password);

    const user = users.find(u => u.username === username);

    if (user != null) {
        if(user.password === password){
            done(null, user)

        } else {
            done(null, false);
        }

    } else {
        done(null, false);
    }
}
));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "MySecretKey"
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
    console.log('JWT is valid');
    console.log('payload is as follows');
    console.log(jwt_payload);

    done(null, jwt_payload);
}))


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

app.get("/v3annnual",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v3annual')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/v3monthly",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v3monthly')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/v4ica1",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v4ica1')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/v4ica2",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v4ica2')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/v4ica3",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v4ica3')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})
app.get("/v5vostok",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM vostokicecore')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})

app.get("/v6icecore",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM icecore800k')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})

app.get("/v7temperaturechange",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v7temperaturechange')

        if (!result) result=[]
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }

})

app.get("/v7co2",async function (req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        const [result] = await connection.execute('SELECT * FROM v7co2')

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

})

app.post(
    '/login',
    passport.authenticate('basic', { session: false }),
    (req, res) => {

  
      const payload = {
        user: {
            id: req.user.id,
            username: req.user.username
        }
      };
  
      const options = {
        expiresIn: '1d'
      }
  
      const secretKey = "MySecretKey";

      const token = jwt.sign(payload, secretKey, options);
  
      return res.json({ jwt: token });
  });

  app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("OK for user " + req.user.user.username + 'id is' + req.user.user.id);
  })

app.listen(port)