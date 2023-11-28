import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../stores/apiUrl";

const ShowProperty = () => {
  const id = useParams().id;
  const [property, setProperty] = useState({});
  const [owner, setOwner] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/properties/" + id, {
          method: "get",
          headers: {
            // 'Authorization': `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          setProperty(jsonData);

          fetch(API_URL + "/user/" + jsonData.user_id, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              setOwner(response);
            });
        } else {
          throw new Error("Erreur lors de la requête");
        }
      } catch (error) {
        console.error("Erreur de requête : ", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="container mx-auto mt-10">
      <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
        <img
          src={property.image}  // Ajoutez la propriété image de votre modèle
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">{property.title}</h3>
          <p className="text-gray-200 mb-2">Bien n° : {property.id}</p>
          <p className="text-gray-200 mb-2">Description : {property.description}</p>
          <p className="text-gray-200 mb-2">Superficie : {property.superficie}</p>
          <p className="text-gray-200 mb-2">Nombre de pièces : {property.num_rooms}</p>
          <p className="text-gray-200 mb-2">Meublé : {property.furnished ? "Oui" : "Non"}</p>
          <p className="text-gray-200 mb-2">Catégorie : {property.category}</p>
          <p className="text-gray-200 mb-2">Propriétaire : {owner.email}</p>
          <p className="text-green-600 mb-2">Prix : {property.price}</p>
          <Link to="/" className="text-blue-500 hover:underline">Retour à la page d'accueil</Link>


        </div>
      </div>
    </div>
  );
};

export default ShowProperty;
