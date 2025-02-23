console.log("Bonus Workshop");

const formEl = document.querySelector("#countryForm");
const inputEl = document.querySelector("#searchCountry");
const submitBtn = document.querySelector("#submitBtn");
const display = document.querySelector("#displayCountries");
const countriesInEuBtn = document.querySelector("#countriesInEu");
const neighboursOfMacedoniaBtn = document.querySelector("#neighboursOfMacedonia");
const getMacedoniaBtn = document.querySelector("#getMacedonia");

const showLoading = () => {
  display.innerHTML = `<div></div>`;
};

const hideLoading = () => {
  display.innerHTML = "";
};

let allCountries = [];

const fetchAllCountries = async () => {
  try {
    showLoading();

    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    allCountries = data;

    hideLoading();
  } catch (error) {
    console.log("Error:", error);
  }
};

const getEuropeCountries = () => {
  const europeCountries = allCountries.filter((country) => country.region === "Europe");
  displayCountries(europeCountries);
};

const getMacedonianNeighbours = () => {
  const macedonia = allCountries.find((country) => country.name.common === "North Macedonia"); 

  const neighbours = macedonia.borders;
  const neighboursCountries = allCountries.filter((country) => neighbours.includes(country.cca3));

  displayCountries(neighboursCountries);
};

const getMacedonia = () => {
  const macedonia = allCountries.find((country) => country.name.common === "North Macedonia");

  displayCountries([macedonia]);
};


formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchQuery = inputEl.value.trim();

  if (searchQuery) {
    fetchCountries(searchQuery);
    inputEl.value = "";
  }
});

const fetchCountries = (searchQuery) => {
  const filterCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  displayCountries(filterCountries);
};

const displayCountries = (countries) => {
  hideLoading();
  display.innerHTML = "";

  if (countries.length === 0) {
    display.innerHTML = `<p id="notFound">Country Not Found</p>`;

    return;
  }

  countries.forEach((country) => {
    const countryFlag = country.flags?.svg || "default-flag.svg";
    const countryCapital = country.capital ? country.capital[0] : "N/A";
    const countryPopulation = country.population ? country.population.toLocaleString() : "N/A";
    const countryArea = country.area ? country.area.toLocaleString() : "N/A";
    const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
    const currencies = country.currencies ? Object.values(country.currencies).map((c) => c.name).join(", ") : "N/A";

    display.innerHTML += `
      <div class="card">
        <h2>${country.name.common}</h2>
        <img src="${countryFlag}" width="120px" alt="Flag of ${country.name.common}">
        <p>Population: ${countryPopulation}</p>
        <p>Capital: ${countryCapital}</p> 
        <p>Area: ${countryArea} km²</p>
        <p>Languages: ${languages}</p>
        <p>Currencies: ${currencies}</p>
      </div>
    `;
  });
};

countriesInEuBtn.addEventListener("click", getEuropeCountries);
neighboursOfMacedoniaBtn.addEventListener("click", getMacedonianNeighbours);
getMacedoniaBtn.addEventListener("click", getMacedonia);

fetchAllCountries();
