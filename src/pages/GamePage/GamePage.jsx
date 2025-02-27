import React from "react";
import { useParams, Link } from "react-router-dom";
import "./GamePage.scss";
import { useEffect } from "react";
import SongForm from "../../components/SongForm/SongForm";
import SongLyric from "../../components/SongLyrics/SongLyrics";
import randomArtist from "../../utils/RandomSong";

const GamePage = () => {
  const { genre } = useParams();

  // useEffect(() => {
  //   randomArtist();
  // }, []);

  return (
    <div className="game-page">
      <h2>{genre} Lyrics Challenge</h2>
      <SongLyric />
      <SongForm />
      <Link to="/" className="back-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default GamePage;
