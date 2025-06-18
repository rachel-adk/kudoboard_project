// const express = require('express')
// const { PrismaClient } = require('@prisma/client');
// const router = express.Router()

// const prisma = new PrismaClient();


// // // Get all the cards
// // router.get('/boards/:id/cards', async(req, res) =>{
// //     try{
// //         const cards = await prisma.card.findMany()
// //         res.status(200).json(cards)
// //     }
// //     catch (error) {
// //         res.status(500).json( {message: "Failed to get cards" })
// //     }
// // });


// // // Creating a new card
// // router.post('/', async (req, res) => {

// //     // Getting new card info from request body
// //     const { title, message, gif, upvotes } = req.body

// //     if (!title || !message|| !gif || !upvotes) {
// //         res.status(400).json({ message: "Missing required fields" })
// //     }

// //     try {
// //         const newCard = await prisma.card.create({
// //             data: { title, message, gif, upvotes }
// //         })
// //         res.status(201).json(newCard)
// //     } catch (err){
// //         res.status(500).json({ message: "Failed to create card"})
// //     }
// // })

// // // // filtering boards by category
// // // router.get('/filter', async (req, res) => {
// // //     const { category } = req.query

// // //     try {
// // //         const filteredBoards = await prisma.plant.findMany({
// // //             where: category ? { category: { equals: category, mode: 'insensitive'} } : undefined,
// // //             include: { cards:true }
// // //     })
// // //     res.status(200).json(filteredBoards)
// // //     } catch(err) {
// // //     res.status(500).json({ message: "Error filtering boards"})
// // //     }
// // //     })

// // // reading a single card by id
// // router.get('boards/:id/cards/:id', async (req, res) => {
// //     try {
// //         const board = await prisma.card.findUnique({
// //             where: { id }
// //     })
// //     if (!card) return res.status(404).json({ message: "Could not find card"})
// //     } catch (err) {
// //         res.status(500).json({ message: "Could not fetch card data"})
// //     }
// // })

// // // updating a card by id
// // router.put('/:id', async (req, res) => {
// //     const { id } = req.params
// //     const { title, message, gif, upvotes } = req.body
// //     try{
// //     const board = await prisma.card.update({
// //         where: { id },
// //         data: { title, message, gif, upvotes }
// //     })
// //     res.status(200).json(card)
// //     } catch (err) {
// //         res.status(404).json({ message: 'Card not found'})
// //     }
// // })

// // // Deleting a card by id
// // router.delete('boards/:id/cards:/id', async (req, res) => {
// //     const { id } = req.params
// //     try{
// //         await prisma.card.update({
// //             where: { id }
// //         })
// //         res.status(200).json({ message: "Card deleted"})
// //     } catch (err) {
// //         res.status(500).json({ message: "Error deleting the card"})
// //     }
// // })

// // module.exports = router
