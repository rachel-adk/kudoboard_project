import React from "react";
import "./KudoCards.css";
import KudoCardData from "../KudoCardData";

function KudoCards() {
  return (
    <div className="kudoCard">
      {KudoCardData.map((card, index) => (
        <KudoCards
          key={index}
          title={card.title}
          image={card.image}
          description={card.description}
        />
      ))}
    </div>
  );
};
export default KudoCards;
