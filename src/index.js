import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import refs from './refs';
import SearchCountry from './fetchCountries';
import {
  createCountryCard,
  createLanguagesMarkup,
  renderCountryInfo,
  createCountryListMarkup,
  renderCountryList,
  clearHTML,
} from './renderService';

const DEBOUNCE_DELAY = 300;

refs.searchField.addEventListener(
  'input',
  debounce(onSearchFieldChange, DEBOUNCE_DELAY)
);

const countryHandler = new SearchCountry();

function onSearchFieldChange(e) {
  if (!e.target.value.trim()) {
    clearHTML();
    return;
  }
  countryHandler.option = e.target.value.trim();
  countryHandler
    .fetchCountries()
    .then(clearHTML)
    .then(renderData)
    .catch(catchError);
}

function renderData(data) {
  if (data.length === 1) {
    const markup = createCountryCard(data);
    return renderCountryInfo(markup);
  }
  if (data.length > 1 && data.length <= 10) {
    const markup = createCountryListMarkup(data);
    return renderCountryList(markup);
  }
  if (data.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function catchError(error) {
  console.log('ERROR: Bad request to backend');
  console.log(error);
  clearHTML();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
