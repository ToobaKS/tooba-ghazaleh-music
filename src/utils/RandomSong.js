import { SongsApi } from "./SongsApi";

async function randomArtist(){
    let songsApi = new SongsApi();
    let songs = await songsApi.getArtistByGenre(132);
}

export default randomArtist;


