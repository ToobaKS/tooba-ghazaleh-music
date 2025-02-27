import React from "react";
import "./SongForm.scss";

const SongForm = ({ answer, setAnswer, error, handleSubmit }) => {
  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the missing lyric"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default SongForm;
