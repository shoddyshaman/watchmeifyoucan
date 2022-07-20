const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
const { searchMovie, addMovie } = require ('./controllers/movieController')
const { userLogin, userSignup} = require('./controllers/authController')

//entry-point for app
app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

//external api endpoints
app.get('/api/query',searchMovie)


//auth endpoints
app.get('/api/login',userLogin)
app.get('/api/signUp',userSignup)

app.post('/api/list',addMovie)

app.listen(4040,() => console.log(`server running on 4040`))