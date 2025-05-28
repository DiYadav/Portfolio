// Card.jsx
import React from 'react';
import Home from '../pages/Home'

const Hcard = ({ title, description }) => {
  return (
    <div className="bg-white w-[300px] h-[200px] text-slate-900 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
     <h1 className="text-xl font-bold text-gray-800 text-center mb-4">{title}</h1>
  <h5 className="text-blue-600 text-lg text-center font-bold ">{description}</h5>
    </div>
  );
};

export default Hcard;