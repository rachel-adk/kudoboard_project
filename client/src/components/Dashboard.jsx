import React from "react";
import "./Dashboard.css";
import kudoBoardData from "../kudoBoardData";
import KudoBoard from "./KudoBoard";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {kudoBoardData.map((board, index) => (
        <KudoBoard
          key={index}
          title={board.title}
          image={board.image}
          description={board.description}
          author={board.author}
        />
      ))}
    </div>
  );
};
{
  /* </div>
            {!searchQuery && (
              <div className='loadMore'>
              <button onClick={loadMore}>
              <p>Load More</p>
              </button>
          </div>
        )}
        {selectCard &&
          <ModalDisplay movie = {selectCard}
                                onClose={() => setSelectCard(null)}/>}
      </> */
}

export default Dashboard;
