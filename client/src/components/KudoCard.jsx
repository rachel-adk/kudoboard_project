import React from "react";
import "./KudoCards.css";

function KudoCard({ card }) {
  console.log('card', card);
  return (
    <div className="kudoCard">
        <div>
          <img src={card.gif} alt={card.title} />
          <h3>{card.message}</h3>
          <p>{card.author}</p>
        </div>
    </div>
  );
};
export default KudoCard;
