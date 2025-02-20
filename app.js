console.log("Bonus Workshop");

const formEl = document.querySelector("#countryForm");
const inputEl = document.querySelector("#searchCountry");
const submitBtn = document.querySelector("#submitBtn");
const display = document.querySelector("#displayCountries");

console.log(formEl ,inputEl, submitBtn, display);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchQuery = inputEl.value.trim();

  if (searchQuery) {
    fetchCountries(searchQuery);
    inputEl.value = "";
  }
});

const fetchCountries = async (searchQuery) => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const filterCountries = data.filter((country) => {
      return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    });

    displayCountries(filterCountries);
  } catch (error) {
    console.log("Error:", error);
  }
};

const displayCountries = (countries) => {
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

    display.innerHTML += `
      <div class="card">
        <h2>${country.name.common}</h2>
        <img src="${countryFlag}" width="120px" alt="Flag of ${country.name.common}">
        <p>Population: ${countryPopulation}</p>
        <p>Capital: ${countryCapital}</p> 
        <p>Area: ${countryArea} km²</p>
      </div>
    `;
  });
};

