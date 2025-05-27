// Card.jsx
import React from 'react';
import Home from '../pages/Home'

const Hcard = ({ title, description }) => {
  return (
    <div className="bg-white w-[300px] h-[200px] text-slate-900 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold mb-5">{title}</h2>
      <p className="text-gray-700 font-bold mb-50" >{description}</p>
    </div>
  );
};

export default Hcard;