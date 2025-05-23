import { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSignOut = () => {
    setAuth(false);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          </h2>

          {/* Burger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/incomes" className="hover:text-gray-200 font-medium text-lg">
              Incomes
            </NavLink>
            <NavLink to="/expenses" className="hover:text-gray-200 font-medium text-lg">
              Expenses
            </NavLink>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Sign Out
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            <NavLink to="/incomes" className="hover:text-gray-200 font-medium text-lg" onClick={() => setMenuOpen(false)}>
              Incomes
            </NavLink>
            <NavLink to="/expenses" className="hover:text-gray-200 font-medium text-lg" onClick={() => setMenuOpen(false)}>
              Expenses
            </NavLink>
            <button
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
              className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
