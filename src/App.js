import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="countryGrid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map(country => (
            <div className="countryCard" key={country.cca3}>
              <img src={country.flags.png} alt={`${country.name.common} flag`} />
              <h3>{country.name.common}</h3>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default App;
