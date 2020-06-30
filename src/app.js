import "./style.css";
import "./plugins";
import locationStore from "./store/locations.store";
import formUI from "./views/form";
import elements from "./config/ui";
import { formatDateFromString } from "./helpers/date";
import ticketsUI from "./views/tickets";
import favoritesStore from "./store/favorites.store";
import favoritesUI from "./views/favorites";
import airlinesService from "./store/airlines.store";
import airlinesStore from "./store/airlines.store";

const {
  form,
  countryOrigin,
  countryDestination,
  cityOrigin,
  cityDestination,
  startDate,
  endDate,
  ticketsContainer,
} = elements;

// locationStore.init().then((res) => {
//   const x = locationStore.getCitiesByCountryCode("GL");
//   console.log(x);
// });

document.addEventListener("DOMContentLoaded", () => {
  initApp();

  //Events
  countryDestination.addEventListener("change", (e) => {
    onCountryChange("cityDestination", countryDestination.value);
  });

  countryOrigin.addEventListener("change", (e) => {
    onCountryChange("cityOrigin", countryOrigin.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTickets();
  });

  ticketsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-favorites")) {
      const id = e.target.dataset.id;
      onAddToFavorites(id);
    }
  });

  //Handlers
  async function initApp() {
    await locationStore.init();
    await airlinesStore.init();
    formUI.renderCountries(locationStore.countries);
  }

  function onCountryChange(type, value) {
    const cities = locationStore.getCitiesByCountryCode(value);
    formUI.renderCities(type, cities);
  }

  async function searchTickets() {
    const depart_date = formatDateFromString(startDate.value, "yyyy-MM");
    const return_date = formatDateFromString(startDate.value, "yyyy-MM");
    const origin = cityOrigin.value;
    const destination = cityDestination.value;

    await locationStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
    });

    ticketsUI.renderTickets(locationStore.lastSearch);
  }

  function onAddToFavorites(id) {
    const ticket = locationStore.getTicketById(id);
    favoritesStore.addNewFavorite(ticket);
    favoritesUI.renderFavorites(favoritesStore.favorites);
  }
});
