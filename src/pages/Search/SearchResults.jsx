
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { term } = useParams();
  const [results, setResults] = useState([]);
  const Apiurl = 'http://127.0.0.1:3000'
  console.log(results, term)


  useEffect(() => {
    fetch(`${Apiurl}/search?term=${term}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching search results:', error));
  }, [term]);

  return (
    <div>
      <h2>Search Results for "{term}"</h2>
      <ul>
        {results.map(property => (
          <li key={property.id}>
            <h3>Titre : {property.title}</h3>
            <p>Description : {property.description}</p>
            <p> Prix : {property.price}</p>
            <p> Ville : {property.city_name} </p>
            <p> Pays : {property.country_name} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

