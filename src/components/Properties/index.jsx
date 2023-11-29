import { useState, useEffect } from "react";
import { API_URL } from "../../stores/apiUrl";
import { Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([])

  // RECUPERER LES DONNEES POUR LA LISTE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/properties", {
          method: 'get',
          headers: {
            // 'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const responseData = await response.json();
  
          // Assurez-vous que responseData est un objet avec la propriété 'properties'
          if (responseData && Array.isArray(responseData.properties)) {
            const reversedData = responseData.properties.reverse();
            setProperties(reversedData);
          } else {
            console.error('Les données récupérées ne sont pas au format attendu.');
          }
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error);
      }
    };
    fetchData();
  }, []);
  
  

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-4">Liste de nos biens :</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
        {properties.map(property => {
          return (
            <div key={property.id} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
              <img src="url_de_votre_image" alt={property.title} className="w-full h-32 object-cover rounded-t-lg" />
              <div className="p-6">
                <p className="text-gray-600 text-sm">Annonce n° : {property.id}</p>
                <p className="text-xl font-semibold">{property.title}</p>
                <p className="text-gray-300">{property.description}</p>
                <p className="text-green-500 font-semibold">Prix : {property.price}</p>
                <Link to={`/property/${property.id}`} className="text-blue-500 hover:underline">En savoir plus</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Properties;
