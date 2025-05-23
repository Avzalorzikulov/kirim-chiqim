import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import { API } from "../../utils/config";
import { toast } from "react-toastify";

const Expenses = () => {
  const loader = useLoaderData();
  const [expenses, setExpenses] = useState(loader || []);
  const [expensesValue, setExpensesValue] = useState({
    title: "",
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (evt) => {
    setExpensesValue({ ...expensesValue, [evt.target.name]: evt.target.value });
  };

  const fetchExpenses = async () => {
    try {
      const response = await API.get("get-expenses");
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("add-expense", {
        title: expensesValue.title,
        amount: parseInt(expensesValue.amount),
        description: expensesValue.description,
        date: expensesValue.date,
        category: expensesValue.category,
      });

      if (response.data) {
        await fetchExpenses();
      }

      toast.success("Expense added successfully");
      setExpensesValue({
        title: "",
        amount: "",
        description: "",
        date: "",
        category: "",
      });
    } catch (err) {
      toast.error("Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Expenses
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {["title", "amount", "category", "description", "date"].map((field) => (
          <div key={field} className="col-span-1">
            <label className="block text-gray-700 font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              name={field}
              type={
                field === "amount"
                  ? "number"
                  : field === "date"
                  ? "date"
                  : "text"
              }
              onChange={onChange}
              value={expensesValue[field]}
              placeholder={`Enter ${field}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </form>

      <ul className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {expenses.map((element) => (
          <TransactionItem
            key={element._id}
            {...element}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
