import React, { useState } from 'react'
import './App.css'
import kudoBoardData from './kudoBoardData';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard'



function App () {
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
      <div className='KudoApp'>
        <header className='App-header'>
        <h1>Kudoboard </h1>
        </header>
        <button className='filterButtons'>
                    <h3>Filter by</h3>
                    <button>All</button>
                    <button>Celebration</button>
                    <button>Inspiration</button>
                    <button>Thank You</button>
                  </button>

      </div>
      <SearchBar
              onBoardChange={handleBoardChange}
              onClearSearch={handleClearSearch}
            />

            <Dashboard
              searchQuery={searchQuery}
              data = {kudoBoardData}>

            </Dashboard>
      <footer className="footer">
        <p>Copyright 2025</p>
      </footer>

  </>
);
}

export default App
