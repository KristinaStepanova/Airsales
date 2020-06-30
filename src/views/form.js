import elements from "../config/ui";

class FormUI {
  constructor(el) {
    this.form = el.form;
    this.countryOrigin = el.countryOrigin;
    this.countryDestination = el.countryDestination;
    this.cityOrigin = el.cityOrigin;
    this.cityDestination = el.cityDestination;
  }

  renderCountries(countries) {
    const fragment = document.createDocumentFragment();
    countries.forEach(({ name, code }) => {
      const option = FormUI.optionTemplate(name, code);
      fragment.appendChild(option);
    });
    const clone = fragment.cloneNode(true);
    this.countryOrigin.appendChild(fragment);
    this.countryDestination.appendChild(clone);
  }

  renderCities(selectName, cities) {
    this[selectName].innerHTML = "";
    const fragment = document.createDocumentFragment();
    cities.forEach(({ name, code }) => {
      const option = FormUI.optionTemplate(name, code);
      fragment.appendChild(option);
    });
    this[selectName].appendChild(fragment);
    this[selectName].disabled = false;
    this[selectName].focus();
  }

  static optionTemplate(label, value) {
    return new Option(label, value);
  }
}

const formUI = new FormUI(elements);

export default formUI;
