import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  useEffect(() => {
    toast.success("Muvaffaqiyatli kirildi!");
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-start">
      <div className="flex flex-col  w-1/6 bg-gray-800 text-white shadow-lg p-4">
        <ul className="space-y-4">
          <li className="text-lg font-semibold hover:text-blue-500 transition-all duration-200">
            <Link to="/main">Main</Link>
          </li>
          <li className="text-lg font-semibold hover:text-blue-500 transition-all duration-200">
            <Link to="/incomes">Incomes</Link>
          </li>
          <li className="text-lg font-semibold hover:text-blue-500 transition-all duration-200">
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className="text-lg font-semibold hover:text-blue-500 transition-all duration-200">
            <Link to="/history">History</Link>
          </li>
        </ul>
      </div>

      <main className="flex-1 flex flex-col">
        <Header />

        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default Home;
