import aviasalesService from "../services/aviasales.service";
import { generateId } from "../helpers/uuid";

class LocationsStore {
  constructor(api, generateId) {
    this.api = api;
    this.generateId = generateId;
    this.countries = {};
    this.cities = {};
    this._lastSearch = {};
  }

  get lastSearch() {
    return Object.values(this._lastSearch);
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
    ]);

    const [countries, cities] = response;
    this.countries = countries;
    this.cities = cities;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this._lastSearch = this.updateData(response.data);
  }

  updateData(data) {
    return Object.entries(data).reduce((acc, [, value]) => {
      value.id = this.generateId();
      acc[value.id] = value;
      return acc;
    }, {});
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter((city) => city.country_code === code);
  }

  getCitiesNameByCode(code) {
    return this.cities.find(item => item.code === code).name;
  }

  getTicketById(id) {
    return this._lastSearch[id];
  }
}

const locationsStore = new LocationsStore(aviasalesService, generateId);

export default locationsStore;
