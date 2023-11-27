/* eslint-disable no-unused-vars */
import { useState } from 'react';
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
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('property[title]', title);
    formData.append('property[price]', price);
    formData.append('property[description]', description);
    formData.append('property[superficie]', superficie); // Ajout des nouveaux champs
    formData.append('property[num_rooms]', numRooms);
    formData.append('property[furnished]', furnished);
    formData.append('property[category]', category);
    formData.append('property[user_id]', user.id);
    formData.append('image', image);


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
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du bien :", error);
    }
  }

  return (
    <div>
      <h2>Ajoutez un nouveau bien</h2>
      <form  encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="content"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="image">image:</label>
          <input
          type="file"
          name="image"
          onChange={handleImageChange} />
        </div>
        <div>
          <label htmlFor="superficie">Superficie (m²) :</label>
          <input
            type="number"
            id="superficie"
            value={superficie}
            onChange={handleSuperficieChange}
          />
        </div>
        <div>
          <label htmlFor="numRooms">Nombre de pièces :</label>
          <input
            type="number"
            id="numRooms"
            value={numRooms}
            onChange={handleNumRoomsChange}
          />
        </div>
        <div>
          <label htmlFor="furnished">Meublé :</label>
          <input
            type="checkbox"
            id="furnished"
            checked={furnished}
            onChange={handleFurnishedChange}
          />
        </div>
        <div>
          <label htmlFor="category">Autres :</label>
           <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default CreateProperty;
