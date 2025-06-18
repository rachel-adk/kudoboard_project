const express = require('express')
// const { default: kudoBoardData } = require('../client/src/kudoBoardData')
// const { default: KudoCardData } = require('../client/src/KudoCardData')
const app = express()
const PORT = 3000

app.use(express.json())

//Import board routes
const boardRoutes  = require('./routes/boardRoutes')

app.get('/', (req, res) => {
  res.send('Kudoboard!')
})

//Use board routes for /board path
app.use('/boards', 'boardRoutes')


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
