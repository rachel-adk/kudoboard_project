import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import CardPage from "./components/CardPage";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light")
    }
  }, [darkMode]);
  const toggleTheme = () => setDarkMode((prev) => !prev);
    return (
      <div className="appTheme">
        <button onClick={toggleTheme} className="toggleButton">
          {darkMode ? (
            <>
              Dark Mode: <MdDarkMode />
            </>
          ) : (
            <>
              Light Mode: <MdLightMode />
            </>
          )}
        </button>
      <Router>
          <header className="App-header">
            <h1>Kudoboard </h1>
          </header>
          <div className="cards">
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/boards/:boardId' element={<CardPage/>}/>
          </Routes>
          </div>
        </Router>
        </div>
    );
  }

  export default App;
