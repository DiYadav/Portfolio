import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#111111] text-white ml-[250px]">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Hi, I'm <span className="text-blue-500">Dinesh Yadav</span>
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          A passionate Backend Developer crafting beautiful and functional web experiences
        </p>
        <Link
          to="/Projects"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
        >
          View My Work →
        </Link>
        <div className="mt-8">
          <img
            src="/workspace.jpg"
            alt="Workspace"
            className="mx-auto w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
