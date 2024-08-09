import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCountries(data))
      .catch(error => {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries. Please try again later.');
      });
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
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="countryGrid">
          {filteredCountries.length > 0 ? (
            filteredCountries.map(country => (
              <div className="countryCard" key={country.cca3}>
                <img src={country.flags.png} alt={`${country.name.common} flag`} />
                <h2>{country.name.common}</h2>
              </div>
            ))
          ) : (
            <p className="noCountries">No countries found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
