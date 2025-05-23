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
      const endpoint =
        type === "income" ? `delete-income/${_id}` : `delete-expense/${_id}`;
      await API.delete(endpoint);
      onDelete(_id);
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
        } hover:bg-opacity-80 rounded-xl shadow-md p-4 mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 transition-all duration-300`}
      >
        <div className="flex-1 w-full sm:w-auto">
          <h3 className="text-left text-lg sm:text-xl font-semibold text-white">
            {title}
          </h3>
          <p className="text-left text-white text-sm sm:text-base mt-1">{description}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-white text-gray-800 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        <div className="flex justify-between sm:justify-end items-center w-full sm:w-auto gap-4">
          <p className="text-xl font-bold text-white">${amount}</p>
          <button
            onClick={handleDeleteClick}
            className="text-white hover:text-red-300 text-2xl font-bold focus:outline-none"
          >
            ×
          </button>
        </div>
      </li>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this transaction?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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
