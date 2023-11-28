import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../../../stores/apiUrl';

function Register() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(API_URL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get('Authorization'));
        Cookies.set('id', data.user.id);

        setUser({
          isLoggedIn: true,
          token: response.headers.get('Authorization'),
          id: data.user.id,
        });

        navigate('/authsuccess');
      } else {
        setError('Erreur lors de la création du compte');
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Créer un compte</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email :
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Mot de passe :
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-600">
              Confirme ton mot de passe :
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setPassword_Confirmation(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none">
            Créer un compte et se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
