import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";

const genres = ["Pop", "Rock", "Hip-Hop", "R&B", "Indie", "Dance"];
const genresId = [132, 152, 116, 165, 60, 114];

const HomePage = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [error, setError] = useState("");

  const handleStartGame = (e) => {
    if (!player1 || !player2) {
      e.preventDefault();
      setError("Please enter both players' names!");
    } else if (!selectedGenre) {
      e.preventDefault();
      setError("Please select a genre!");
    } else {
      setError("");
    }
  };

  return (
    <div className="container">
      <h1>Guess The Lyric 🎤</h1>
      <p>Are you a lyrical genius?</p>
      <form className="player-form">
        <div className="player-inputs">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </div>
        <div className="genre-buttons">
          {genres.map((genre, index) => (
            <button
              key={genre}
              type="button"
              className={`genre-card ${
                selectedGenre === genresId[index] ? "selected" : ""
              }`}
              data-genre={genresId[index]}
              onClick={() => setSelectedGenre(genresId[index])}
            >
              {genre}
            </button>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <Link
          to={
            player1 && player2 && selectedGenre
              ? `/game/${selectedGenre}/${player1}/${player2}`
              : "#"
          }
          className="start-button"
          onClick={handleStartGame}
        >
          START GAME
        </Link>
      </form>
    </div>
  );
};

export default HomePage;