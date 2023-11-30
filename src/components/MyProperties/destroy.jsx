import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom } from "../../stores/userAtom";
import { API_URL } from "../../stores/apiUrl";

const DestroyProperty = ({ propertyId, onDelete }) => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const id = propertyId;

  const handleDestroy = async () => {
    try {
      const response = await fetch(API_URL + '/properties/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
      });

      if (response.ok) {
        console.log('Property deleted successfully');
        onDelete();
      } else {
        console.log('Failed to delete property');
      }
    } catch (error) {
      console.error('An error occurred while deleting property:', error);
    }
  };

  return (
    <button
      onClick={handleDestroy}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
    >
      Supprimer ce bien
    </button>
  );
};

export default DestroyProperty;
