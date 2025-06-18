import React from "react";
import "./Dashboard.css";
import kudoBoardData from "../kudoBoardData";
import KudoBoard from "./KudoBoard";
import KudoCards from "./KudoCard";

const Dashboard = ({ searchQuery, data }) => {
  // const [boards, setBoards] = useState(kudoBoardData);
  // const [openBoard, setOpenBoard] = useState(null);

  // const handleOpenBoard = (board) => {
  //   setOpenBoard(board);
  // };

  // const handleDeleteBoard = (board) => {
  //   setBoards(boards.filter((b) => b.title !== board.title));
  //   if {openBoard && openBoard.title === board.title} {
  //     setOpenBoard(null);
  //   }
  // };
  const filteredBoards = searchQuery
    ? data.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

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
