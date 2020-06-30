import elements from "../config/ui";

class FavoritesUI {
  constructor(el) {
    this.favoritesList = el.favoritesList;
  }

  renderFavorites(list) {
    this.favoritesList.innerHTML = "";

    let fragment = "";
    list.forEach((item) => {
      const template = FavoritesUI.listTemplate(item);
      fragment += template;
    });

    this.favoritesList.insertAdjacentHTML("afterbegin", fragment);
  }

  static listTemplate(item) {
    return `
      <li data-id="${item.id}">${item.departure_at}, ${item.airline}</li>`;
  }
}

const favoritesUI = new FavoritesUI(elements);

export default favoritesUI;
