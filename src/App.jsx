import './App.css';
import Login from './pages/Login/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/Auth';
import Main from './pages/Main/Main';
import Incomes from './pages/Incomes/Incomes';
import Expenses from './pages/Expenses/Expenses';
import History from './pages/History/History';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { API } from './utils/config';
import Home from './pages/Home/Home';

function App() {
  const { auth } = useContext(AuthContext);

  const getIncomes = async () => {
    const res = await API.get('/get-incomes');
    return res.data
  };
  
  const getExpenses = async () => {
    const res = await API.get('/get-expenses');
    return res.data
  };
  

  const getHistory = async () => {
    const incomes = await getIncomes();
    const expenses = await getExpenses();
    return { incomes, expenses };
  };

  const getMain = async () => {
    const incomes = await getIncomes();
    const expenses = await getExpenses();
    return { incomes, expenses };
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivateRoute auth={auth}>
          <Home />
        </PrivateRoute>
      ),
      children: [
        {
          path: '/main',
          element: <Main />,
          loader: getMain,
        },
        {
          path: '/incomes',
          element: <Incomes />,
          loader: getIncomes,
        },
        {
          path: '/expenses',
          element: <Expenses />,
          loader: getExpenses,
        },
        {
          path: '/history',
          element: <History />,
          loader: getHistory,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
