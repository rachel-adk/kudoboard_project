import React from "react";
import "./Dashboard.css";
import KudoCard from "./KudoCard";

const CardPage = ({ data }) => {
  return (

    <div className="dashboard">
      {data.map((card) => (
        <KudoCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardPage;
