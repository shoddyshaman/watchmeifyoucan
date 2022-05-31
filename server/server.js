const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
const { searchMovie } = require ('./controllers/movieController')

//external api endpoints
app.get('/api/query',searchMovie)


app.listen(4040,() => console.log(`server running on 4040`))