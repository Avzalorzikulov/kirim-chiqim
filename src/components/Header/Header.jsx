import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';

function Header() { 
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSignOut = () => {
    setAuth(false);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          </h2>
          <div className="flex items-center space-x-6">
            <NavLink to="/incomes" className="text-white hover:text-gray-200 font-medium text-lg">Incomes</NavLink>
            <NavLink to="/expenses" className="text-white hover:text-gray-200 font-medium text-lg">Expenses</NavLink>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
