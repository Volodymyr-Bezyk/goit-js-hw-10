import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';

export default class SearchCountry {
  constructor() {
    this.name = '';
    this.filter = 'name,capital,population,flags,languages';
  }
  get option() {
    return this.name;
  }

  set option(newOption) {
    this.name = newOption;
  }

  fetchCountries() {
    const url = `${BASE_URL}/name/${this.name}?fields=${this.filter}`;

    return fetch(url).then(this.checkResponse).catch(this.catchError);
  }

  checkResponse(response) {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }
  catchError(error) {
    console.log('ERROR: Bad request to backend');
    console.log(error);
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}
