import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Startpage() {
  const navigate=useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans relative">
      {/* Header Buttons */}
      <button 
        onClick={() => setShowLogin(true)}
        className="absolute top-10 right-40 bg-black text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Login
      </button>
      <button 
        onClick={() => setShowRegister(true)}
        className="absolute top-10 right-10 bg-black text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Register
      </button>

      {/* Content */}
      <section className="flex items-center justify-center min-h-[550px] px-6">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1">
            <h3 className="text-red-200 uppercase text-sm mb-2">I am</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Dinesh Yadav</h1>
            <h2 className="text-red-200 text-xl mb-6">Full Stack Developer</h2>
            <p className="text-gray-200 mb-6 max-w-md">
              I'm a Full Stack Developer skilled in building dynamic web applications using React, Node.js, Django, and MySQL...
            </p>
            <button 
            onClick={()=>navigate("/AboutMe")}
              className="border border-white text-white px-6 py-2 hover:bg-white hover:text-pink-600 transition"
            >
              About Me
            </button>
          </div>

          {/* Right */}
          <div className="flex-1 flex justify-center">
            <img
              src="/dk.jpg"
              alt="Profile"
              className="w-[500px] mt-10 mb-20 ml-10 h-auto rounded shadow-[0_0_30px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
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

      {/* Modal Popup */}
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#0f0f0f] rounded-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-white text-xl"
            >
              ×
            </button>

            <h2 className="text-white text-2xl font-semibold mb-6 text-center">
              {showLogin ? "Login" : "Register"}
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              />

              {showRegister && (
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
                />
              )}

              <div className="flex justify-between items-center text-sm text-gray-400">
                <label>
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                {showLogin && <a href="#" className="hover:underline">Forgot password?</a>}
              </div>

              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white hover:from-pink-600 hover:to-purple-600 transition">
                {showLogin ? "Login" : "Register"}
              </button>

              <div className="flex justify-center gap-4 mt-4">
                <button className="text-2xl"><img src="https://img.icons8.com/color/48/google-logo.png" alt="G" width={24} /></button>
                <button className="text-2xl"><img src="https://img.icons8.com/color/48/facebook-new.png" alt="F" width={24} /></button>
                <button className="text-2xl"><img src="https://img.icons8.com/material-rounded/48/github.png" alt="GH" width={24} /></button>
              </div>
            </form>

            <div className="text-center text-gray-400 text-sm mt-6">
              {showLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setShowLogin(!showLogin);
                  setShowRegister(!showRegister);
                }}
                className="text-pink-500 hover:underline"
              >
                {showLogin ? "Register" : "Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Startpage;







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