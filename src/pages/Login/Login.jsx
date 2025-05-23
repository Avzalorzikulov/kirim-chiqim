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

    const {setAuth} = useContext(AuthContext)
    
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        API.post('login', {email, password})
        .then((res)=> {
            res.data.token && localStorage.setItem('token', res.data.token) 
            setAuth(true);
            navigate('/')
        }
        ).catch((err)=> setError('Login yoki parol xato!!!'));
        
    }
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm p-4 bg-white rounded shadow-md">
          <form className='mt-3 mb-3' onSubmit={handleSubmit}>
            <div className="mb-4">
              <input onChange={(evt) => {setEmail(evt.target.value)}}
                type="email"
                placeholder="Email"
                // value='rustamov@gmail.com'
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <input onChange={(evt) => {setPassword(evt.target.value)}}
                type="password"
                placeholder="Password"
                // value='Rustamov0710@'
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        <Link to='/register' className='text-blue-600 hover:underline text-lg'>Register</Link>
          
        {error && <p className='text-red-500 mb-4'>Login yoki parol xato!!!</p>}
        </div>
      </div>
    );
  }
  
  export default Login