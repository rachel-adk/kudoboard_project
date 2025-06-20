import React from "react";
import KudoCard from "./KudoCard";
import "./CardList.css"

const CardList = ({ cards, onDelete, onUpdate }) => {
  const sortPinnedCards = [...cards].sort((a, b) => {
    if (a.pinned === b.pinned) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return b.pinned - a.pinned;
  });

  return (
    <>
    {sortPinnedCards.length > 0 &&
      sortPinnedCards.map((card) => (
        <KudoCard onDelete={onDelete} key={card.id} card={card} onUpdate={onUpdate} />
      ))}
    </>
  );
};

export default CardList;
