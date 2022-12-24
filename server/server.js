const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const corsOptions = {
    exposedHeaders: 'Authorization',
  };

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static('public'))
const { searchMovie, getTopMovies} = require ('./controllers/movieController')
const { userLogin, userSignup } = require('./controllers/authController')
const { seed } = require('./controllers/db/seed.db.controller')
const { addMovie, getAllmovies } = require('./controllers/db/movie.db.controller')
const { isAuthenticated } = require('./controllers/middleware/isAuthenticated')

//entry-point for app
app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})


//external api endpoints
app.get('/api/query',searchMovie)
app.get('/api/topRated',getTopMovies)

//auth endpoints
app.post('/api/login',userLogin)
app.post('/api/signUp',userSignup)

//seed endpoint
app.post('/api/seed',seed)  

app.post('/api/list/:id',isAuthenticated ,addMovie)
app.get('/api/list/:id', isAuthenticated ,getAllmovies)

app.listen(4040,() => console.log(`server running on 4040`))