import "./SongPage.scss";
import { useEffect } from "react";
import SongForm from "../../components/SongForm/SongForm";
import SongLyric from "../../components/SongLyrics/SongLyrics";
import randomArtist from "../../utils/RandomSong";

function SongPage() {
  useEffect(() => {
    randomArtist();
  }, []);

  return (
    <main className="photo-page-content">
      <SongLyric />
      <SongForm />
    </main>
  );
}

export default SongPage;
