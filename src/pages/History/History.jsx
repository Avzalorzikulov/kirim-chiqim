import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const History = () => {
  const { incomes, expenses } = useLoaderData();
  const [filter, setFilter] = useState("all");

  const allEntries = [...incomes, ...expenses];

  const filterEntries = (entries) => {
    const now = new Date();
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (filter === "1week") {
        return now - entryDate <= 7 * 24 * 60 * 60 * 1000;
      } else if (filter === "1month") {
        return now - entryDate <= 30 * 24 * 60 * 60 * 1000;
      } else if (filter === "1year") {
        return now - entryDate <= 365 * 24 * 60 * 60 * 1000;
      }
      return true;
    });
  };

  const filteredEntries = filterEntries(allEntries).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">History</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {[
          { label: "All Time", value: "all" },
          { label: "Last 1 Week", value: "1week" },
          { label: "Last 1 Month", value: "1month" },
          { label: "Last 1 Year", value: "1year" },
        ].map((btn) => (
          <button
            key={btn.value}
            className={`px-4 py-2 rounded transition ${
              filter === btn.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-center">
        {[
          { label: "Total Income", value: totalIncome, color: "text-green-500" },
          {
            label: "Total Balance",
            value: balance,
            color: balance >= 0 ? "text-green-500" : "text-red-500",
          },
          { label: "Total Expenses", value: -totalExpense, color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-medium">{stat.label}</h2>
            <p className={`text-2xl font-bold ${stat.color}`}>
              ${stat.value.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Entry List */}
      {filteredEntries.length > 0 ? (
        <ul className="space-y-4">
          {filteredEntries.map((entry, idx) => (
            <li
              key={idx}
              className={`p-4 rounded-lg shadow-md ${
                entry.type === "expense" ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="font-bold text-lg mb-1 sm:mb-0">
                    {entry.type.toUpperCase()} - ${entry.amount}
                  </h3>
                  <p className="text-gray-600">{formatDate(entry.date)}</p>
                </div>
                <div className="text-sm text-gray-700 mt-2 sm:mt-0">
                  Category: <span className="font-medium">{entry.category}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-6">No history available.</p>
      )}
    </div>
  );
};

export default History;
