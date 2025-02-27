import axios from "axios";

export class SongsApi {
    constructor() {
      this.baseURL = "https://api.deezer.com";
    }
  
    async getSongLyrics() {
      try {
        const request = `${this.baseURL}/comments/?api_key=${this.apiKey}`;
        let response = (await axios.get(request)).data;
        response.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return response;
      } catch (error) {
          console.error(error);
      }
    }
  
    async getSongPreview() {
      try {
        const request = `${this.baseURL}/showdates/?api_key=${this.apiKey}`;
        const response = await axios.get(request);
        return response.data;
      } catch (error) {
          console.error(error);
      }
    }
  
    async getArtistByGenre(id) {
      try {
        const request = `${this.baseURL}/genre/${id}/artists`;
        const response = await axios.get(request);
        console.log(response);
        return response;
      } catch (error) {
          console.error(error);
      }
    }
  
    async deleteComment(id) {
      try {
          const request = `${this.baseURL}/comments/${id}/?api_key=${this.apiKey}`;
          const response = await axios.delete(request);
          return response;
        } catch (error) {
            console.error(error);
        }
    }
  }
  