import React from 'react';
import Hcard from '../components/Hcard';

const Home = () => {
  const cards = [
    { title: "Projects", description: "10" },
    { title: "Certification", description: "10" },
    { title: "Skills", description: "20" },
  ];

  return (
    <div className="absolute top-20 right-48 bg-slate-900 text-white px-4 py-8 rounded-xl shadow-lg">
      {/* Main content */}
      <div className="grid justify-end mb-10">
        <div className="text-white p-6 rounded shadow-md max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-4">
            Hi, I'm <span className="text-blue-400">Dinesh Yadav</span>
          </h1>
          <p className="text-lg">
            A passionate Backend Developer crafting beautiful and functional web experiences
          </p>
        </div>
      </div>

      {/* Cards section */}
    
      <div className="absolute grid grid-cols-1 right-20 sm:grid-cols-2 md:grid-cols-3 gap-[100px] justify-center">
        {cards.map((cards, index) => (
          <Hcard key={index} title={cards.title} description={cards.description} />
        ))}
      </div>
      </div>

  );
};

export default Home;
