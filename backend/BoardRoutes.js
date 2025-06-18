const express = require('express')
const { PrismaClient } = require('./../generated/prisma')
const router = express.Router()

const prisma = new PrismaClient();

router.get('/boards', async(req, res) =>{
    try{
        const boards = await prisma.board.findMany({
        where:{},})
    }
    catch (error) {
        res.status(500).send("Failed to get boards")
    }
});


//Utility function to find the board and card with a given id
const findBoardById = (id) = boards.find(board => board.id === id)

//Creating a new board
router.post('/', (req, res) => {
    //Getting new board info from request body
    const boardData = req.body

    if (!boardData || !boardData.name){
        res.status(400).send("Need to add required information")
    }

    const newBoard = {
        id: boards.length + 1,
        ...boardData
    }

    //Adding new board to board array
    boards.push(newBoard)

    res.status(201).send(newBoard)
    })

    // filtering boards by category
    router.get('/', async (req, res) => {
        const queryParams = req.query

        let filteredBoards = await prisma.plant.findMany();

        if (queryParams.category) {
            filteredBoards = filteredBoards.filter(board => board.category.toLowerCase() === queryParams.toLowerCase())
        }

        res.status(200).send(filteredBoards)
    })
    //reading a single board by id

    // updating a board by id
    router.put('/:id', (req, res) => {
        const { title, description, author, cards } = req.body
        const board = findBoardById(parseInt(req.params.id))

        if (board) {
            board.title = title
            board.description =description
            board.author = author
            board.cards = cards
            board.category = category
            res.status(200).send(board)
        } else {
            res.status(404).send({ message: 'Board not found'})
        }
    })

    // Deleting a board by id
    router.delete(':/id'), (req, res) => {
        const boardId = parseInt(req.params.id)
        const boardIndex = boards.findIndex(board => board.id === boardId)

        if (boardIndex > -1) {
            boards = boards.filter(board => board.id !== boardId)
            res.status(200).send({ message: 'Board deleted successfully'})
        } else{
            res.status(404).send({ message: 'Board not found'})
        }
    }

    module.exports = router
