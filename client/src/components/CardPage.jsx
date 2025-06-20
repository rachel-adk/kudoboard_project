import { useEffect, useState } from "react";
import "./Dashboard.css";
import CardList from "./CardList";
import CreateCard from "./CreateCard";
import "./CardPage.css"
import { useParams } from "react-router-dom";
import {
  getBoards,
  getCards,
  deleteCard,
  createCard,
} from "../api/backend_data";

const CardPage = () => {
  const { boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [chooseCard, setChooseCard] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (newData) => {
    try {
      await createCard(newData, boardId);
      const newCards = await getCards(boardId);
      setCards(newCards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (newCards) => {
    setCards((prev) =>
      prev.map((card) => (card.id === newCards.id ? newCards : card))
    );
  };

  const handleOpenComments =(card) => {
    setChooseCard(card);
    setShowModal(true);

  }

  const handleCloseComments = () => {
    setChooseCard(null);
    setShowModal(false);
  }

  useEffect(() => {
    getCards(boardId)
      .then((data) => {
        setCards(data);
      })
      .catch(console.error);
  }, [boardId]);

  useEffect(() => {
    getBoards().then(setBoards).catch(console.error);
  }, []);

  const board = boards.find((board) => board.id === parseInt(boardId));

  if (boards.length === 0) {
    return (
      <>
        <h2>Searching for cards...</h2>
      </>
    );
  } else if (!board) {
    return (
      <>
        <h2>Board not found</h2>
      </>
    );
  }

  return (
    <>
      <a href={`/`}>Back</a>
      <div className="cards">
        <h3>{board.title}</h3>
        <CreateCard onCreate={handleCreate} />
        <CardList
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          cards={cards}
          onOpenComments={handleOpenComments}
        />
      </div>
      <footer>Copyright 2025</footer>
      {chooseCard && showModal && (
        <Comments card={chooseCard}
        onClose={handleCloseComments} />
      )}
    </>
  );
};

export default CardPage;
