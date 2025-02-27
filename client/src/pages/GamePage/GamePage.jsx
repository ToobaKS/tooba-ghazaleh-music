import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./GamePage.scss";
import SongForm from "../../components/SongForm/SongForm";

const GamePage = () => {
  // Retrieve genre id and player names from URL parameters.
  const { genre, player1, player2 } = useParams();

  const [song, setSong] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer (in seconds)

  // Normalize strings: remove punctuation, extra spaces, lowercase.
  const normalizeString = (str) =>
    str
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();

  // Timer effect: decrease timeLeft every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch song data from your backend server using the genre id.
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:8080/genre/${genre}`);
        const data = await response.json();
        setSong(data);
      } catch (err) {
        console.error("Error fetching song:", err);
      }
    };
    fetchSong();
  }, [genre]);

  // Compute missing words: remove last 5 words and store them for answer comparison.
  let missingWords = "";
  let displayedLyrics = "";
  if (song && song.lyrics) {
    const words = song.lyrics.trim().split(/\s+/);
    if (words.length >= 5) {
      missingWords = words.slice(-5).join(" ");
      displayedLyrics =
        words.slice(0, -5).join(" ") +
        " ______ ______ ______ ______ ______";
    } else {
      displayedLyrics = song.lyrics;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }
    setError("");

    // Compare normalized strings.
    if (
      song &&
      normalizeString(answer) === normalizeString(missingWords)
    ) {
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 5,
      }));
    }
    setAnswer("");
    // Toggle current player's turn.
    setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1"));

    // Fetch a new song for the next round.
    try {
      const response = await fetch(`http://localhost:8080/genre/${genre}`);
      const data = await response.json();
      setSong(data);
    } catch (err) {
      console.error("Error fetching new song:", err);
    }
  };

  // Helper to format timeLeft as mm:ss.
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // When the timer reaches 0, determine and display the winner.
  if (timeLeft === 0) {
    let winner = "";
    if (scores.player1 > scores.player2) winner = player1;
    else if (scores.player2 > scores.player1) winner = player2;
    else winner = "It's a tie!";
    return (
      <div className="game-page">
        <h2>Time's Up!</h2>
        <p>Winner: {winner}</p>
        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="game-page">
        <h2>Lyrics Challenge</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="game-page">
      <h2>Lyrics Challenge</h2>
      <div className="timer">
        <p>Time Left: {formatTime(timeLeft)}</p>
      </div>
      <p className="artist">{song.artist}</p>
      <p className="artist">{song.song}</p>
      <audio controls src={song.preview} />
      <p className="lyrics">{displayedLyrics}</p>
      <div className="scoreboard">
        <p>
          {player1}: {scores.player1} pts
        </p>
        <p>
          {player2}: {scores.player2} pts
        </p>
        <p>
          Current Turn: {currentPlayer === "player1" ? player1 : player2}
        </p>
      </div>
      <SongForm
        answer={answer}
        setAnswer={setAnswer}
        error={error}
        handleSubmit={handleSubmit}
      />
      <Link to="/" className="back-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default GamePage;


