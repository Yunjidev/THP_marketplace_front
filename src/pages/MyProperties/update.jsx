import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import { API_URL } from '../../stores/apiUrl';

function UpdateProperty() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [superficie, setSuperficie] = useState(''); // Ajout de la superficie
  const [numRooms, setNumRooms] = useState(''); // Ajout du nombre de chambres
  const [furnished, setFurnished] = useState(''); // Ajout de l'indicateur meublé
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const propertyId = useParams().id;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProperty = {
      property: {
        title: title,
        price: price,
        description: description,
        superficie: superficie, // Ajout de la superficie
        num_rooms: numRooms, // Ajout du nombre de chambres
        furnished: furnished, // Ajout de l'indicateur meublé
        user_id: user.id
      }
    };

    try {
      const response = await fetch(`${API_URL}/properties/${propertyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(updatedProperty),
      });

      if (response.ok) {
        console.log('Le bien a été modifié avec succès');
        navigate(`/myproperties/${user.id}`);
      } else {
        console.error('Erreur lors de la modification du bien');
      }
    } catch (error) {
      console.error('Erreur lors de la modification du bien :', error);
    }
  };


  return (
    <div className="container mx-auto mt-8 mb-8">
      <h2 className="text-3xl text-center font-semibold mb-4">Modifier ce bien</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="text-gray-200 block mb-2">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="text-gray-200 block mb-2">Prix :</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-gray-200 block mb-2">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="superficie" className="text-gray-200 block mb-2">Superficie :</label>
          <input
            type="number"
            id="superficie"
            value={superficie}
            onChange={handleSuperficieChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numRooms" className="text-gray-200 block mb-2">Nombre de chambres :</label>
          <input
            type="number"
            id="numRooms"
            value={numRooms}
            onChange={handleNumRoomsChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="furnished" className="text-gray-200 block mb-2">Meublé :</label>
          <input
            type="checkbox"
            id="furnished"
            checked={furnished}
            onChange={handleFurnishedChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none">
          Modifier
        </button>
      </form>
    </div>
  );
}

export default UpdateProperty;
