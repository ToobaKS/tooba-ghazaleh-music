import React from "react";
import { useParams, Link } from "react-router-dom";
import "./GamePage.scss";

const GamePage = () => {
  const { genre } = useParams();
  return (
    <div className="game-page">
      <h2>{genre} Lyrics Challenge</h2>
      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
};

export default GamePage;