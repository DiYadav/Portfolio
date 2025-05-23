import React from "react";
import { Navigate } from "react-router-dom";

function Startpage() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans">
      <section className="relative w-full min-h-[550px] bg-black-600 flex items-center justify-center">
        {/* Home Button at top-right */}
        <button className="absolute top-10 right-40 bg-black-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Me
        </button>
        <button className="absolute top-10 right-10 bg-black-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Contact
        </button>
        <button onClick={()=>Navigate("/")} className="absolute top-10 right-60 bg-black-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Home
        </button>
        {/* Main Content */}
        <div className="max-w-7xl w-full min-h-screen px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Left Side */}
          <div className="flex-1">
            <h3 className="text-red-200 uppercase text-sm mb-2">I am</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Dinesh Yadav</h1>
            <h2 className="text-red-200 text-xl mb-6">Full Stack Developer</h2>
            <p className="text-gray-200 mb-6 max-w-md">
              I'm a Full Stack Developer skilled in building dynamic web applications using React, Node.js, Django, and MySQL.
              I create responsive frontends and robust backends, ensuring smooth end-to-end performance.
              Passionate about learning and delivering clean, scalable code in collaborative environments.
            </p>
            <button className="border border-white text-white px-6 py-2 hover:bg-white hover:text-pink-600 transition">
              About Me
            </button>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex justify-center">
            <img
              src="/dinesh.jpg" // Replace with actual path
              alt="Profile"
              className="w-80 h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-10 text-center">
          <div>
            <p className="text-red-200 text-xl font-bold">0</p>
            <p className="text-sm text-gray-100">Years Experience</p>
          </div>
          <div>
            <p className="text-red-200 text-xl font-bold">2</p>
            <p className="text-sm text-gray-100">Projects</p>
          </div>
          <div>
            <p className="text-red-200 text-xl font-bold">0</p>
            <p className="text-sm text-gray-100">Clients</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Startpage;
