import refs from './refs';

export function createCountryCard(data) {
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

export function createLanguagesMarkup(lang) {
  const keys = Object.keys(lang);
  return keys
    .map(key => {
      return `${lang[key]}, `;
    })
    .join('')
    .slice(0, length - 2);
}

export function renderCountryInfo(markup) {
  refs.countryInfo.innerHTML = markup;
}

export function createCountryListMarkup(data) {
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

export function renderCountryList(markup) {
  refs.countryList.innerHTML = markup;
}

export function clearHTML() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
