import React from 'react';

function Skills() {
  return (
    <div className="absolute top-20 ml-[500px] right-30 rounded-xl bg-slate-950 text-white px-4 py-2 shadow-slate-600">
      <img 
        className="flex w-64 h-36 justify-end " 
        src="/Ai.jpg" 
        alt="Certificate" 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Ai Certificate</div>
        <p className="text-gray-700 text-base">
          This is the Microsoft Ai Fundamental Batch Certificate
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
          Share
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
          See
        </button>
      </div>
    </div>
  );
}


export default Skills;