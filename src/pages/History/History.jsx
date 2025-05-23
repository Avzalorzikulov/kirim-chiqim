
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

  const filteredEntries = filterEntries(allEntries).sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">History</h1>

      <div className="flex justify-center space-x-4 mb-6">
        {[
          { label: "All Time", value: "all" },
          { label: "Last 1 Week", value: "1week" },
          { label: "Last 1 Month", value: "1month" },
          { label: "Last 1 Year", value: "1year" },
        ].map((btn) => (
          <button
            key={btn.value}
            className={`px-4 py-2 rounded ${filter === btn.value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-6 space-x-6">
        {[{ label: "Total Income", value: totalIncome, color: "text-green-500" },
          { label: "Total Balance", value: balance, color: balance >= 0 ? "text-green-500" : "text-red-500" },
          { label: "Total Expenses", value: -totalExpense, color: "text-red-500" }].map((stat) => (
          <div key={stat.label} className="text-center">
            <h2 className="text-xl font-semibold">{stat.label}</h2>
            <p className={`text-2xl font-bold ${stat.color}`}>${stat.value.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {filteredEntries.length > 0 ? (
        <ul className="space-y-4">
          {filteredEntries.map((entry, idx) => (
            <li
              key={idx}
              className={`p-4 rounded-lg shadow-md ${entry.type === "expense" ? "bg-red-200" : "bg-green-200"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-lg">{entry.type.toUpperCase()}</span>
                  <div className="text-gray-600">${entry.amount} - {formatDate(entry.date)}</div>
                </div>
                <span className="text-sm text-gray-500">{entry.category}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No history available.</p>
      )}
    </div>
  );
};

export default History;