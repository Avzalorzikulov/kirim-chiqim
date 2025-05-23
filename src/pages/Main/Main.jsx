import React from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const Main = () => {
  const loader = useLoaderData();
  const { incomes, expenses } = loader;

  // Tranzaksiyalarni birlashtirish
  const combinedData = [...incomes, ...expenses]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      date: new Date(item.date).toISOString(),
      type: item.type,
      amount: item.amount,
      income: item.type === 'income' ? item.amount : 0,
      expense: item.type === 'expense' ? item.amount : 0,
    }));

  // Oxirgi 3 ta tranzaksiyani olish
  const lastThreeTransactions = [...combinedData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Sana formatlash funksiyasi (XAxis va Tooltip uchun)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Tooltipni sozlash
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleString('en-GB', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold text-gray-800">{date}</p>
          <p style={{ color: '#ff4747' }}>Expense: {payload[0].value}</p>
          <p style={{ color: '#4ade80' }}>Income: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-100 flex">
      <main className="flex-1 flex flex-col">
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
          <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Income vs Expense Diagram
            </h1>
            <div className="w-full h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={combinedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate} // Sana formatlash
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} /> {/* Yangi Tooltip */}
                  <Legend />
                  <Bar dataKey="expense" fill="#ff4747" name="Expense" />
                  <Bar dataKey="income" fill="#4ade80" name="Income" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Oxirgi 3 ta tranzaksiya */}
            <div className="bg-gray-50 p-4 rounded shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Last 3 Transactions
              </h2>
              <ul className="space-y-4">
                {lastThreeTransactions.map((transaction, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-lg shadow-md ${
                      transaction.type === 'expense' ? 'bg-red-200' : 'bg-green-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-lg text-gray-800">
                          {transaction.type.toUpperCase()}
                        </span>
                        <div className="text-gray-600">
                          ${transaction.amount} - {formatDate(transaction.date)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
