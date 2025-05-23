import React, { useState } from "react";
import { API } from "../../utils/config";

const TransactionItem = (props) => {
  const { _id, title, description, category, amount, type, onDelete } = props;

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const endpoint = type === "income" ? `delete-income/${_id}` : `delete-expense/${_id}`;
      await API.delete(endpoint); // API so'rovni bajaramiz
      onDelete(_id); // Ota komponentdagi `state`ni yangilash
      setShowModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <li
        id={_id}
        className={`${
          type === "expense" ? "bg-red-500" : "bg-green-500"
        } hover:bg-gray-200 rounded-lg shadow-lg p-5 mb-5 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-300`}
      >
        <div className="flex-1 mb-4">
          <h3 className="text-left text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-left text-gray-700 text-sm">{description}</p>
          <p className="text-left text-white text-xs font-medium py-1">{category}</p>
        </div>

        <div className="text-right flex items-center gap-4">
          <p className="text-lg font-bold text-white">${amount}</p>
          <button
            onClick={handleDeleteClick}
            className="text-red-500 hover:text-red-400 font-bold text-xl bg-transparent focus:outline-none transition-all duration-200"
          >
            x
          </button>
        </div>
      </li>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this transaction?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
