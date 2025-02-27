export class songs {
    constructor() {
      this.baseURL = "https://api.deezer.com/";
    }
  
    async postComment(comment) {
      try {
        const request = `${this.baseURL}/comments/?api_key=${this.apiKey}`;
        const response = await axios.post(request, comment);
        return response;
      } catch (error) {
          console.error(error);
      }
    }
  
    async getComments() {
      try {
        const request = `${this.baseURL}/comments/?api_key=${this.apiKey}`;
        let response = (await axios.get(request)).data;
        response.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return response;
      } catch (error) {
          console.error(error);
      }
    }
  
    async getShows() {
      try {
        const request = `${this.baseURL}/showdates/?api_key=${this.apiKey}`;
        const response = await axios.get(request);
        return response.data;
      } catch (error) {
          console.error(error);
      }
    }
  
    async likeComment(id) {
      try {
        const request = `${this.baseURL}/comments/${id}/like/?api_key=${this.apiKey}`;
        const response = await axios.put(request);
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
  