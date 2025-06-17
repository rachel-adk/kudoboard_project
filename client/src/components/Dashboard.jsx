import React from "react";
import "./Dashboard.css";
import kudoBoardData from "../kudoBoardData";
import KudoBoard from "./KudoBoard";

const Dashboard = ({ searchQuery, data, KudoCards }) => {
  const filteredBoards = searchQuery
    ? data.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : kudoBoardData;

  return (
    <div className="dashboard">
      {filteredBoards.map((board, index) => (
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
