import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      onSearch(response.data);
      setSearchTerm("");
      // Clear previous errors
      setError(null);
    } catch (error) {
      // Handle error and show the error message
      console.error("Error fetching data:", error);
      setError(
        "Sorry we couldn't find definitions for the word you were looking for."
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter a word..."
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
