import axios from "axios";
import config from "../config/api";

class AirlinesService {
  constructor(config, http) {
    this.url = config.url;
    this.http = http;
  }

  async airlines() {
    try {
      const response = await this.http.get(`${this.url}/airlines`);
      return response;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const airlinesService = new AirlinesService(config, axios);

export default airlinesService;
