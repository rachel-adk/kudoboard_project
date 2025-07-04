const express = require("express");
const cors = require('cors')
const { PrismaClient } = require("./generated/prisma");
//require ('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Import board routes

// Get all the boards
app.get("/boards", async (req, res) => {
  const { category, search } = req.query;
  try {
    const boards = await prisma.board.findMany({
      where: {
        ...(category && { category: { equals: category, mode: "insensitive" }
        }),
        ...(search && {
          title: { contains: search, mode: "insensitive" }
        })
      },
      include: { cards: true },
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Failed to get boards" });
  }
});

// Creating a new board
app.post("/boards", async (req, res) => {
  const { title, author, category } = req.body;
  if (!title || !author || !category) {
    res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newBoard = await prisma.board.create({
      data: { ...req.body },
    });
    res.status(201).json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create board" });
  }
});


// reading a single board by id
app.get("/boards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
      include: { cards: true },
    });
    if (!board) {
      res.status(404).json({ message: "Could not find board" });
      return;
    }
    return res.status(200).json({ board });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch board data" });
  }
});

// Deleting a board by id
app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting the board" });
  }
});

// Get all the cards for a board
app.get("/boards/:id/cards", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Board ID is invalid" });
    return;
  }
  try {
    const cards = await prisma.card.findMany({ where: { boardId: id } });
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Failed to get cards" });
  }
});

// Creating a new card
app.post("/boards/:id/cards", async (req, res) => {
  //Getting new card info from request body
  const { title, message, gif, author } = req.body;
  const boardId = parseInt(req.params.id);

  console.log("boardId:", boardId);
  console.log("request body:", req.body);

  if (!title || !message || !gif || !author) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const boardExists = await prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!boardExists) {
      return res.status(404).json({ message: "Board does not exist" });
    }
    const newCard = await prisma.card.create({
      data: { title, message, gif, author, boardId },
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Could not create card" });
  }
});

// getting a single card by id
app.get("/cards/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const card = await prisma.card.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!card) {
      return res.status(404).json({ message: "Could not find card" });
    }
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch card data" });
  }
});

// upvoting a card by id
app.patch("/cards/:id/upvote", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const updatedCard = await prisma.card.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Could not upvote card" });
  }
});

// pinning a card by id
app.patch("/cards/:id/pinned", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Card is invalid'})
      }
      console.log('id', id)
      const validCard =  await prisma.card.findUnique({
        where: { id }
      });
      console.log('validCard', validCard)
      if (!validCard){
        return res.status(404).json({ message: 'Card not found'})
      }
      const pinnedCards = await prisma.card.update({
        where: { id },
        data: { pinned: new Date() },
      });
      console.log('pinnedCards', pinnedCards)
      return res.json(pinnedCards);
    } catch (error) {
        console.error('error', error)
      res.status(500).json({ message: "Could not pin card" });
    }
  });

// Deleting a card by id
app.delete("/cards/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(404).json({ message: "Card ID not valid" });
  }
  try {
    const validCard = await prisma.card.findUnique({
      where: { id },
    });

    if (!validCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    const deletedCard = await prisma.card.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Card deleted", card: deletedCard });
  } catch (error) {
    console.error("Delete error", error);
    res.status(500).json({ message: "Error deleting the card" });
    return;
  }
});

// Add a comment to a card
app.post('/cards/:id/comments', async (req, res) => {
  const {message, author='Anonymous', cardId} = req.body;
  console.log("CardId: ", cardId);
  if (!message ){
      return res.status(400).json({message: 'Message is required'});
  }
  try{
      const newComment = await prisma.comment.create({
          data: {
              message,
              author,
              card: {connect: {id: parseInt(cardId)}}
          }
      });
      res.status(201).json(newComment);
  }catch(error){
      console.error(error);
      res.status(500).json({message: 'Failed to create comment'});}
});

// getting a comment
app.get("/cards/:id/comments", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const cardWithComments = await prisma.card.findUnique({
      where: { id: parseInt(id, 10) },
      include: {comments: true},
    });

    if (!cardWithComments) {
      return res.status(404).json({ message: "Could not find comment for card" });
    }
    res.json(cardWithComments.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch comments for card" });
  }
});

module.exports = app;
