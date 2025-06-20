import React from "react";
import "./Dashboard.css";
import { deleteBoard } from "../api/backend_data";
import KudoBoard from "./KudoBoard";


const Dashboard = ({ boards, setBoards }) => {
  const handleDelete = async (id) => {
    try {
      await deleteBoard(id);
      setBoards(boards.filter((board) => board.id !== id));
    } catch (error) {
      console.error(error);
  }
}

  return (
    <div className="dashboard">

      {boards.map((board) => (
        <KudoBoard
          key={board.id}
          board ={board}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
{
}

export default Dashboard;
