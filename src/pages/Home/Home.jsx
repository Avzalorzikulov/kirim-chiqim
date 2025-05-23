import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  useEffect(() => {
    toast.success("Muvaffaqiyatli kirildi!");
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-full md:w-1/5 lg:w-1/6 p-4">
        <nav>
          <ul className="space-y-4">
            {[
              { label: "Main", path: "/main" },
              { label: "Incomes", path: "/incomes" },
              { label: "Expenses", path: "/expenses" },
              { label: "History", path: "/history" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block text-lg font-semibold hover:text-blue-400 transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Home;
