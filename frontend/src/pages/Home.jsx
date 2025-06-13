import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Linkedin } from 'lucide-react';
import Hcard from '../components/Hcard';

const Home = () => {
  const cards = [
    { title: "PROJECTS", description: "10" },
    { title: "CERTIFICATION", description: "10" },
    { title: "SKILL", description: "20" },
  ];

  return (
    <div className="absolute top-0 left-[350px] w-[1180px]  h-[695px] bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hi, I'm <span className="text-blue-600">Dinesh Yadav</span>
        </motion.h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl ">
          A passionate Backend Developer crafting beautiful and functional web experiences.
        </p>
        <div className="flex space-x-4 mt-6 text-gray-700 h-[50px]" >
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><Github /></a>
          <a href="mailto:you@example.com"><Mail /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="py-10 px-6 bg-white h-[100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <Hcard key={index} title={card.title} description={card.description} />
          ))}
        </div>
      </section>

    
     
    </div>
  );
};

export default Home;
