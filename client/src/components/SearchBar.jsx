import React from "react";
import "./SearchBar.css";

function SearchBar({ onSearchChange, onClearSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearchChange(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        value={searchQuery}
        type="text"
        name="title"
        placeholder="Search for a board here..."
        onChange={handleInputChange}
      />
      <button className="search-button" type="submit">
        Search
      </button>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}

export default SearchBar;
