import elements from "../config/ui";
import airlinesStore from "../store/airlines.store";
import locationsStore from "../store/locations.store";

class TicketsUI {
  constructor(el) {
    this.container = el.ticketsContainer;
  }

  renderTickets(tickets) {
    if (!tickets.length) {
      return alert("No tickets find by your request");
    }
    this.container.innerHTML = "";
    let fragment = "";
    const origin = locationsStore.getCitiesNameByCode(tickets[0].origin);
    const destination = locationsStore.getCitiesNameByCode(
      tickets[0].destination
    );
    tickets.forEach((ticket) => {
      const airlineName = airlinesStore.getAirlinesNameByCode(ticket.airline);
      const template = TicketsUI.ticketTemplate(
        ticket,
        airlineName,
        origin,
        destination
      );
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  static ticketTemplate(ticket, airline, origin, destination) {
    return `
    <div>
      <div class="uk-card uk-card-default uk-card-body">
        <h3 class="uk-card-title">${origin} – ${destination}</h3>
        <p>Time: ${ticket.departure_at}</p>
        <p>Airline: ${airline}</p>
        <img src="http://pics.avs.io/200/200/${ticket.airline}.png"/>
        <button class="uk-button uk-button-default add-favorites" data-id="${ticket.id}">Add to Favorites</button>
      </div>
  </div>`;
  }
}

const ticketsUI = new TicketsUI(elements);

export default ticketsUI;
