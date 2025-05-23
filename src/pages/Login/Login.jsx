import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/Auth';
import { API } from '../../utils/config';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(password);

  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    API.post('login', { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          setAuth(true);
          navigate('/');
        }
      })
      .catch((err) => setError('Login yoki parol xato!!!'));
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              onChange={(evt) => { setEmail(evt.target.value) }}
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(evt) => { setPassword(evt.target.value) }}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to='/register' className="text-blue-600 hover:underline text-lg">
            Register
          </Link>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
