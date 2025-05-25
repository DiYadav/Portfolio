import React from 'react';


const Home = () => {
  return (
    <div className="absolute top-20 ml-15 right-48 bg-slate-900 text-white px-4 py-2">
      
      {/* Main content */}
      <div className=" grid top-0 justify-end">
        <div className="text-white p-6 rounded shadow-md max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-4">Hi, I'm <span>Dinesh Yadav</span></h1>
          <p className="text-lg">
            A passionate Backend Developer crafting beautiful and functional web experiences
          </p>
        </div>
      </div>
      
    </div>
  
  );
};

export default Home;