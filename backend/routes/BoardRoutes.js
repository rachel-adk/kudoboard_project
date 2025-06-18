// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const router = express.Router()
// const prisma = new PrismaClient();

// // Get all the boards
// // router.get('/', async(req, res) =>{
// //     try{
// //         const boards = await prisma.board.findMany({
// //         include: {cards: true}})
// //         res.status(200).json(boards)
// //     }
// //     catch (error) {
// //         res.status(500).json( {message: "Failed to get boards" })
// //     }
// // });


// // // Creating a new board
// // router.post('/', async (req, res) => {

// //     // Getting new board info from request body
// //     const { title, description, author, cards } = req.body

// //     if (!title || !description|| !author || !category) {
// //         res.status(400).json({ message: "Missing required fields" })
// //     }

// //     try {
// //         const newBoard = await prisma.board.create({
// //             data: { title, description, author, category }
// //         })
// //         res.status(201).json(newBoard)
// //     } catch (err){
// //         res.status(500).json({ message: "Failed to create board"})
// //     }
// // })

// // // filtering boards by category
// // router.get('/filter', async (req, res) => {
// //     const { category } = req.query

// //     try {
// //         const filteredBoards = await prisma.plant.findMany({
// //             where: category ? { category: { equals: category, mode: 'insensitive'} } : undefined,
// //             include: { cards:true }
// //     })
// //     res.status(200).json(filteredBoards)
// //     } catch(err) {
// //     res.status(500).json({ message: "Error filtering boards"})
// //     }
// //     })

// // // reading a single board by id
// // router.get('/:id', async (req, res) => {
// //     try {
// //         const board = await prisma.board.findUnique({
// //             where: { id },
// //             include: {cards:true }
// //     })
// //     if (!board) return res.status(404).json({ message: "Could not find board"})
// //     } catch (err) {
// //         res.status(500).json({ message: "Could not fetch board data"})
// //     }
// // })

// // // updating a board by id
// // router.put('/:id', async (req, res) => {
// //     const { id } = req.params
// //     const { title, description, author, cards } = req.body
// //     try{
// //     const board = await prisma.board.update({
// //         where: { id },
// //         data: { title, description, author, category }
// //     })
// //     res.status(200).json(board)
// //     } catch (err) {
// //         res.status(404).json({ message: 'Board not found'})
// //     }
// // })

// // // Deleting a board by id
// // router.delete(':/id', async (req, res) => {
// //     const { id } = req.params
// //     try{
// //         await prisma.board.delete({
// //             where: { id }
// //         })
// //         res.status(200).json({ message: "Board deleted"})
// //     } catch (err) {
// //         res.status(500).json({ message: "Error deleting the board"})
// //     }
// // })

// module.exports = router
