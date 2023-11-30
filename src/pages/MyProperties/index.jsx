/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../../stores/apiUrl";

import UpdateProperty from "./update";
import DestroyProperty from "../../components/MyProperties/destroy";

const MyProperties = () => {
  const id = useParams().id;
  const [myProperties, setMyProperties] = useState([]);

  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "/properties", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        if (Array.isArray(responseData.properties)) {
          const reversedData = responseData.properties.reverse();
          setMyProperties(reversedData.filter(element => element.user_id == id));
        } else {
          console.error('Les données renvoyées ne contiennent pas de liste de propriétés :', responseData);
        }
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error);
      setError('Erreur lors de la récupération des données. Veuillez réessayer plus tard.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePropertyDeleted = async () => {
    await fetchData();
  };

  return (
    <div className="container mx-auto mt-8">
      {error && <p className="text-red-500">{error}</p>}
      <Link to="/createproperty" className="block w-full mb-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center">
        Ajouter un bien
      </Link>
      <h2 className="text-3xl text-center font-semibold mb-4">Mes annonces :</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {myProperties.map(property => (
          <div key={property.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-gray-200 mb-2">Annonce n° : {property.id}</p>
              <p className="text-gray-200 mb-2">Description : {property.description}</p>
              <p className="text-gray-200 mb-2">Superficie : {property.superficie}</p>
              <p className="text-gray-200 mb-2">Nombre de pièces : {property.num_rooms}</p>
              <p className="text-gray-200 mb-2">Meublé : {property.furnished ? "Oui" : "Non"}</p>
              <p className="text-gray-200 mb-2">Catégorie : {property.category}</p>
              <p className="text-gray-200 mb-2">Pays : {property.country_name ?? 'Non spécifié'}</p>
              <p className="text-gray-200 mb-2">Ville : {property.city_name ?? 'Non spécifié'}</p>
              <p className="text-green-500 mb-2">Prix : {property.price}</p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/updateproperty/${property.id}`} className="text-blue-500 hover:underline">Modifier ce bien</Link>
                <DestroyProperty propertyId={property.id} onDelete={handlePropertyDeleted} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProperties;
