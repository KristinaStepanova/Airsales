import airlinesService from "../services/airlines.service";

class AirlinesStore {
  constructor(api) {
    this.api = api;
    this.airlines = [];
  }

  async init() {
    const response = await this.api.airlines();
    this.airlines = response.data;
  }

  getAirlinesNameByCode(code) {
    let airlineName = this.airlines.find((item) => item.code === code).name;
    if (!airlineName) {
      return "Default";
    }
    return airlineName;
  }
}

const airlinesStore = new AirlinesStore(airlinesService);

export default airlinesStore;
