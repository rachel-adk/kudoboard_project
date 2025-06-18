const express = require('express')
// const { default: kudoBoardData } = require('../client/src/kudoBoardData')
// const { default: KudoCardData } = require('../client/src/KudoCardData')
const app = express()
const PORT = 3000

//Import board routes
const boardRoutes  = require('./routes/BoardRoutes.js')
const cardRoutes = require('./routes/CardRoutes.js')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Kudoboard!')
})

//Use board and card routes for /board and /card path
app.use('/boards', boardRoutes)
app.use('/cards', cardRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
