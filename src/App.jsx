import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WordList from "./components/WordList";
import Favorites from "./components/Favourite";
import "./App.css";
import "./index.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [previousSearchResults, setPreviousSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("search");

  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = (data) => {
    //setPreviousSearchResults(searchResults);
    setPreviousSearchResults((prevResults) => [...prevResults, searchResults]);
    setSearchResults(data);
    setActiveTab("search");
  };

  const handleFavorite = (word) => {
    // Check if the word is already in favorites
    const isDuplicate = favorites.some(
      (favorite) => favorite.word === word.word
    );

    if (!isDuplicate) {
      // Extract the example from the word, capitalize the first letter, and add a period
      const capitalizedExample = word.meanings[0]?.definitions[0]?.example
        ? word.meanings[0].definitions[0].example.charAt(0).toUpperCase() +
          word.meanings[0].definitions[0].example.slice(1) +
          (word.meanings[0].definitions[0].example.endsWith(".") ? "" : ".")
        : "";

      // Create a new object with the formatted example
      const wordWithFormattedExample = {
        ...word,
        meanings: [
          {
            ...word.meanings[0],
            definitions: [
              {
                ...word.meanings[0].definitions[0],
                example: capitalizedExample,
              },
            ],
          },
        ],
      };

      // Update the state with the new favorite word
      setFavorites([...favorites, wordWithFormattedExample]);

      // Save the updated favorites to local storage
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, wordWithFormattedExample])
      );
    } else {
      // Handle the case where the word is already in favorites
      alert("This word is already in your favorites.");
    }
  };

  const handleRemove = (word) => {
    const updatedFavorites = favorites.filter((fav) => fav.word !== word.word);
    setFavorites(updatedFavorites);
    // Save to local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <div>
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          Search Dictionary
        </button>
        <button
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => setActiveTab("favorites")}
        >
          View Favorites
        </button>
      </div>

      {activeTab === "search" && (
        <div>
          <SearchBar onSearch={handleSearch} />
          <WordList
            results={searchResults}
            favorites={favorites}
            onFavorite={handleFavorite}
            previousResults={previousSearchResults.flat()}
          />
        </div>
      )}

      {activeTab === "favorites" && (
        <Favorites favorites={favorites} onRemove={handleRemove} />
      )}
    </div>
  );
};

export default App;
