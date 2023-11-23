import React, { useState } from "react";

const Favorites = ({ favorites, onRemove }) => {
  const [filterType, setFilterType] = useState("all");

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredFavorites =
    filterType === "all"
      ? favorites
      : favorites.filter(
          (fav) =>
            fav.meanings[0]?.partOfSpeech.toLowerCase() ===
            filterType.toLowerCase()
        );

  return (
    <div>
      <h2>Favorites</h2>
      <label>
        Filter by Part of Speech:
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="noun">Noun</option>
          <option value="verb">Verb</option>
          <option value="adjective">Adjective</option>
          <option value="adverb">Adverb</option>
        </select>
      </label>

      <ul>
        {filteredFavorites.map((favorite) => (
          <li key={favorite.word}>
            <strong>{favorite.word}</strong>
            <p>
              Definition: {favorite.meanings[0]?.definitions[0]?.definition}
              <p>PartsOfSpech: {favorite.meanings[0]?.partOfSpeech}</p>
            </p>
            {favorite.meanings[0]?.definitions[0]?.example && (
              <p>Example: {favorite.meanings[0].definitions[0].example}</p>
            )}

            <button className="danger-btn" onClick={() => onRemove(favorite)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
