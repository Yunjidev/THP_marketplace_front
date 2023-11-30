/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../../stores/userAtom';
import { API_URL } from '../../stores/apiUrl';

function CreateProperty() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [furnished, setFurnished] = useState(false);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  
  const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL + '/countries', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      console.log('Statut de la réponse :', response.status);
  
      if (response.ok) {
        const jsonData = await response.json();
        console.log('Pays récupérés :', jsonData);
  
        if (Array.isArray(jsonData)) {
          setCountries(jsonData);
        } else {
          console.error('Les données renvoyées pour les pays ne sont pas une liste :', jsonData);
        }
      } else {
        throw new Error("Erreur lors de la récupération des pays");
      }
    } catch (error) {
      console.error('Erreur de requête pour les pays :', error);
    }
  };
  
  
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const handleImageChange = event => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };
  
  const handleSuperficieChange = (event) => {
    setSuperficie(event.target.value);
  };
  
  const handleNumRoomsChange = (event) => {
    setNumRooms(event.target.value);
  };
  
  const handleFurnishedChange = (event) => {
    setFurnished(event.target.checked);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('property[title]', title);
    formData.append('property[price]', price);
    formData.append('property[description]', description);
    formData.append('property[superficie]', superficie);  // Ajout de superficie
    formData.append('property[num_rooms]', numRooms);  // Ajout de numRooms
    formData.append('property[furnished]', furnished);
    formData.append('property[user_id]', user.id);
    formData.append('property[image]', image);
    formData.append('property[category]', category);
    formData.append('property[city]', city);
    formData.append('property[country]', country);
    
    
    try {
      const response = await fetch(API_URL + '/properties', {
        method: 'POST',
        headers: {
          Authorization: `${user.token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        console.log('Le bien a été ajouté avec succès');
        navigate(`/myproperties/${user.id}`);
      } else {
        console.error("Erreur lors de l'ajout du bien");
        const errorText = await response.text();
        console.error('Détails de l\'erreur :', errorText);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du bien :", error);
    }
  }
  useEffect(() => {
    // Appelez la fonction de récupération des pays au montage du composant
    fetchCountries();
  }, []);
  
  return (
    <div className="container mx-auto mt-8">
    <h2 className="text-3xl text-center font-semibold mb-4">Ajoutez un nouveau bien :</h2>
    <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" encType="multipart/form-data" onSubmit={handleSubmit}>
    <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Titre :</label>
    <input
    type="text"
    id="title"
    value={title}
    onChange={handleTitleChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    />
    </div>
    
    <div className="mb-4">
    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Prix :</label>
    <input
    type="number"
    id="price"
    value={price}
    onChange={handlePriceChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    />
    </div>
    
    <div className="mb-4">
    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description :</label>
    <textarea
    id="description"
    value={description}
    onChange={handleDescriptionChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    />
    </div>
    
    <div className="mb-4">
    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image :</label>
    <input
    type="file"
    name="image"
    onChange={handleImageChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    />
    </div>
    
    <div className="mb-4">
    <label htmlFor="superficie" className="block text-gray-700 font-bold mb-2">Superficie (m²) :</label>
    <input
    type="number"
    id="superficie"
    value={superficie}
    onChange={handleSuperficieChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    />
    </div>
    
    <div className="mb-4">
    <label htmlFor="numRooms" className="block text-gray-700 font-bold mb-2">Nombre de pièces :</label>
    <input
    type="number"
    id="numRooms"
    value={numRooms}
    onChange={handleNumRoomsChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    />
    </div>
    
    <div className="mb-4">
    <label htmlFor="furnished" className="flex items-center text-gray-700 font-bold">
    <input
    type="checkbox"
    id="furnished"
    checked={furnished}
    onChange={handleFurnishedChange}
    className="mr-2"
    />
    Meublé
    </label>
    </div>
    
    
    <div className="mb-4">
    <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Pays :</label>
    <select
    id="country"
    value={country}
    onChange={handleCountryChange}
    className="w-full border border-gray-300 p-2 rounded-md"
    >
    <option value="">Sélectionnez un pays</option>
    {countries.map((countryOption) => (
      <option key={countryOption.id} value={countryOption.name}>
      {countryOption.name}
      </option>
      ))}
      </select>
      </div>
      
      <div className="mb-4">
      <label htmlFor="city" className="block text-gray-700 font-bold mb-2">Ville :</label>
      <input
      type="text"
      id="city"
      value={city}
      onChange={handleCityChange}
      className="w-full border border-gray-300 p-2 rounded-md"
      />
      </div>
      
      
      <div className="mb-4">
      <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Catégorie :</label>
      <input
      type="text"
      id="category"
      value={category}
      onChange={handleCategoryChange}
      className="w-full border border-gray-300 p-2 rounded-md"
      />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
      Ajouter
      </button>
      </form>
      </div>
      );
    }
    
    export default CreateProperty;
    