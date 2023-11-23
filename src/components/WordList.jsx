import React from "react";

const WordList = ({ results, previousResults, onFavorite }) => {
  const allResults = [...previousResults, ...results];
  console.log(allResults);

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {allResults.map((result) => (
          <li key={result.word}>
            <strong>{result.word}</strong>
            <p>Definition: {result.meanings[0]?.definitions[0]?.definition}</p>
            <p>PartsOfSpech: {result.meanings[0]?.partOfSpeech}</p>
            {result.meanings[0]?.definitions[0]?.example && (
              <p>Example: {result.meanings[0].definitions[0].example}</p>
            )}

            <button onClick={() => onFavorite(result)}>Favorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
