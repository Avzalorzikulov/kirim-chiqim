import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import { API } from "../../utils/config";
import { toast } from "react-toastify";

const Incomes = () => {
  const loader = useLoaderData();
  const [incomes, setIncomes] = useState(loader || []);
  const [incomesValue, setIncomesValue] = useState({
    title: "",
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (evt) => {
    setIncomesValue({ ...incomesValue, [evt.target.name]: evt.target.value });
  };

  const fetchIncomes = async () => {
    const response = await API.get("get-incomes");
    setIncomes(response.data);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("add-income", {
        title: incomesValue.title,
        amount: parseInt(incomesValue.amount),
        description: incomesValue.description,
        date: incomesValue.date,
        category: incomesValue.category,
      });

      if (response.data) {
        await fetchIncomes(); // reload qilinadi: yangi ro‘yxat olib kelinadi
      }

      toast.success("Income added successfully");
      setIncomesValue({
        title: "",
        amount: "",
        description: "",
        date: "",
        category: "",
      });
    } catch (err) {
      toast.error("Error adding income");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setIncomes(incomes.filter((income) => income._id !== id)); // Remove from local state
  };

  return (
    <div className="px-3">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Incomes
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
      >
        {["title", "amount", "category", "description", "date"].map((field) => (
          <div key={field}>
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
              value={incomesValue[field]}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </form>

      <ul className="mt-6 px-5">
        {incomes.map((element) => (
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

export default Incomes;
