import React, { useState } from "react";
import "./App.css";
import kudoBoardData from "./kudoBoardData";
import KudoCardData from "./KudoCardData";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import CardPage from "./components/CardPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  // import ModalDisplay from './ModalDisplay'

  const handleBoardChange = (newQuery) => {
    setSearchQuery(newQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="KudoApp">
        <header className="App-header">
          <h1>Kudoboard </h1>
        </header>
        <div className="filterButtons">
          <h3>Filter by</h3>
          <button>All</button>
          <button>Celebration</button>
          <button>Inspiration</button>
          <button>Thank You</button>
        </div>
      </div>
      <SearchBar
        onBoardChange={handleBoardChange}
        onClearSearch={handleClearSearch}
      />
      boards
      <Dashboard searchQuery={searchQuery} data={kudoBoardData} />
      cards
      <CardPage data={KudoCardData} />
      <footer className="footer">
        <p>Copyright 2025</p>
      </footer>
    </>
  );
}

export default App;
