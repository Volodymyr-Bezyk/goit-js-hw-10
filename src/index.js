import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import refs from './refs';
import SearchCountry from './fetchCountries';
import refs from './refs';

const DEBOUNCE_DELAY = 300;

refs.searchField.addEventListener(
  'input',
  debounce(onSearchFieldChange, DEBOUNCE_DELAY)
);

const countryHandler = new SearchCountry();

function onSearchFieldChange(e) {
  if (e.target.value.trim()) {
    countryHandler.option = e.target.value.trim();
    countryHandler.fetchCountries().then(countBackendAnswers);
  }
}

function createCountryCard(data) {
  const { name, capital, population, flags, languages } = data[0];
  return ` <div class="country-header">
        <img src="${flags.svg}" alt="${name} flag" width="80" height="40" />
        <h1>${name.official}</h1>
      </div>
      <ul class="country-body">
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>Languages: <span>${createLanguagesMarkup(languages)}</span></li>
      </ul>`;
}

function createLanguagesMarkup(lang) {
  const keys = Object.keys(lang);
  return keys
    .map(key => {
      return `${lang[key]}, `;
    })
    .join('')
    .slice(0, length - 2);
}

function renderCountryInfo(markup) {
  refs.countryInfo.innerHTML = markup;
}

function countBackendAnswers(data) {
  if (data === undefined) {
    console.log('No match');
    clearHTML();
    return;
  }
  if (data.length === 1) {
    console.log('One answer');
    clearHTML();
    renderCountryInfo(createCountryCard(data));
  }
  if (data.length > 1 && data.length <= 10) {
    console.log('<= 10 answer');
    clearHTML();
    const markup = createCountryListMarkup(data);
    renderCountryList(markup);
  }
  if (data.length > 10) {
    clearHTML();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    console.log('Too many asks');
  }
}

function createCountryListMarkup(data) {
  return data
    .map(({ name, capital, population, flags, languages }) => {
      return `<li class="country-list-item country-header">
        <img
          src="${flags.svg}"
          alt=""
          width="80"
          height="40"
        />
        <h3>${name.official}</h3>
      </li>`;
    })
    .join('');
}

function renderCountryList(markup) {
  refs.countryList.innerHTML = markup;
}

function clearHTML() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

// Виправити кетч, хбс
