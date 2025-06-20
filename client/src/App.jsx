import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import kudoBoardData from "./kudoBoardData";
import KudoCardData from "./KudoCardData";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import CardPage from "./components/CardPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  }

  // import ModalDisplay from './ModalDisplay'

  const handleBoardChange = (newQuery) => {
    setSearchQuery(newQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Router>
      <main>
        <header className="App-header">
          <h1>Kudoboard </h1>
        </header>

        <navbar onFilterChange={handleFilterChange} />
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/boards/:boardId' element={<CardPage/>}/>
        </Routes>
        {/* <div className="filterButtons">
          <h3>Filter by</h3>
          <button>All</button>
          <button>Celebration</button>
          <button>Inspiration</button>
          <button>Thank You</button>
        </div> */}
      </main>
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
    </Router>
  );
}

export default App;
