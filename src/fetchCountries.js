import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default class SearchCountry {
  constructor() {
    this.name = '';
    this.filter = '?fields=name,capital,population,flags,languages';
  }
  get option() {
    return this.name;
  }

  set option(newOption) {
    this.name = newOption;
  }

  fetchCountries() {
    const url = `${BASE_URL}${this.name}${this.filter}`;

    return fetch(url).then(this.checkResponse);
  }

  checkResponse(response) {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }
}
