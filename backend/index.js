const express = require('express')
const { default: kudoBoardData } = require('../client/src/kudoBoardData')
const { default: KudoCardData } = require('../client/src/KudoCardData')
const { PrismaClient } = require('@prisma/client');
const app = express()
const PORT = 3000
app.use(express.json())
const prisma = new PrismaClient();



// //Import board routes
// const boardRoutes  = require('./routes/BoardRoutes.js')
// const cardRoutes = require('./routes/CardRoutes.js')

// //Use board and card routes for /board and /card path
// app.use('/boards', boardRoutes)
// app.use('/cards', cardRoutes)


app.get('/', (req, res) => {
  res.send('Kudoboard!')
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })

//Get all the boards
app.get('/', async(req, res) =>{
  try{
      const boards = await prisma.board.findMany({
      include: {cards: true}})
      res.status(200).json(boards)
  }
  catch (error) {
      res.status(500).json( {message: "Failed to get boards" })
  }
});


// Creating a new board
app.post('/', async (req, res) => {

  // Getting new board info from request body
  const { title, author,category} = req.body

  if (!title || !author || !category) {
      res.status(400).json({ message: "Missing required fields" })
  }

  try {
      const newBoard = await prisma.board.create({
          data: { title, author, category }
      })
      res.status(201).json(newBoard)
  } catch (err){
    console.error(err);
      res.status(500).json({ message: "Failed to create board"})
  }
})

// filtering boards by category
app.get('/filter', async (req, res) => {
  const { category } = req.query

  try {
      const filteredBoards = await prisma.plant.findMany({
          where: category ? { category: { equals: category, mode: 'insensitive'} } : undefined,
          include: { cards:true }
  })
  res.status(200).json(filteredBoards)
  } catch(err) {
  res.status(500).json({ message: "Error filtering boards"})
  }
  })

// reading a single board by id
app.get('/:id', async (req, res) => {
  try {
      const board = await prisma.board.findUnique({
          where: { id },
          include: {cards:true }
  })
  if (!board) return res.status(404).json({ message: "Could not find board"})
  } catch (err) {
      res.status(500).json({ message: "Could not fetch board data"})
  }
})

// updating a board by id
app.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, author, cards } = req.body
  try{
  const board = await prisma.board.update({
      where: { id },
      data: { title, description, author, category }
  })
  res.status(200).json(board)
  } catch (err) {
      res.status(404).json({ message: 'Board not found'})
  }
})

// Deleting a board by id
app.delete('/:id', async (req, res) => {
  const { id } = req.params
  try{
      await prisma.board.update({
          where: { id }
      })
      res.status(200).json({ message: "Board deleted"})
  } catch (err) {
      res.status(500).json({ message: "Error deleting the board"})
  }
})

// Get all the cards
app.get('/boards/:id/cards', async(req, res) =>{
  try{
      const cards = await prisma.card.findMany()
      res.status(200).json(cards)
  }
  catch (error) {
      res.status(500).json( {message: "Failed to get cards" })
  }
});


// Creating a new card
app.post('boards/:id/cards', async (req, res) => {

  // Getting new card info from request body
  const { title, message, gif, upvotes } = req.body

  if (!title || !message|| !gif || !upvotes) {
      res.status(400).json({ message: "Missing required fields" })
  }

  try {
      const newCard = await prisma.card.create({
          data: { title, message, gif, upvotes }
      })
      res.status(201).json(newCard)
  } catch (err){
      res.status(500).json({ message: "Failed to create card"})
  }
})

//reading a single card by id
app.get('boards/:id/cards/:id', async (req, res) => {
  try {
      const board = await prisma.card.findUnique({
          where: { id }
  })
  if (!card) return res.status(404).json({ message: "Could not find card"})
  } catch (err) {
      res.status(500).json({ message: "Could not fetch card data"})
  }
})

// updating a card by id
app.put('boards/:id/cards/:id', async (req, res) => {
  const { id } = req.params
  const { title, message, gif, upvotes } = req.body
  try{
  const board = await prisma.card.update({
      where: { id },
      data: { title, message, gif, upvotes }
  })
  res.status(200).json(card)
  } catch (err) {
      res.status(404).json({ message: 'Card not found'})
  }
})

// Deleting a card by id
app.delete('boards/:id/cards/:id', async (req, res) => {
  const { id } = req.params
  try{
      await prisma.card.update({
          where: { id }
      })
      res.status(200).json({ message: "Card deleted"})
  } catch (err) {
      res.status(500).json({ message: "Error deleting the card"})
  }
})

module.exports = app
