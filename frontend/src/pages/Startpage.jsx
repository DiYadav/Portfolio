import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegister from '../components/LoginRegister'; 

function Startpage() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleMode = () => {
  setIsLoginOpen((prev) => !prev);
  setIsRegisterOpen((prev) => !prev);
};

  const closeModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative">
      <button onClick={() => setIsLoginOpen(true)} className="absolute top-10 right-40 bg-black text-white px-4 py-2 rounded hover:bg-red-700">Login</button>
      <button onClick={() => setIsRegisterOpen(true)} className="absolute top-10 right-10 bg-black text-white px-4 py-2 rounded hover:bg-red-700">Register</button>

      <section className="flex items-center justify-center min-h-[550px] px-6">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-red-200 uppercase text-sm mb-2">I am</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Dinesh Yadav</h1>
            <h2 className="text-red-200 text-xl mb-6">Full Stack Developer</h2>
            <p className="text-gray-200 mb-6 max-w-md">
              I'm a Full Stack Developer skilled in building dynamic web applications using React, Node.js, Django, and MySQL...
            </p>
            <button onClick={() => navigate("/AboutMe")} className="border border-white text-white px-6 py-2 hover:bg-white hover:text-pink-600">
              About Me
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/dk.jpg" alt="Profile" className="w-[500px] mt-10 mb-20 ml-10 h-auto rounded shadow-[0_0_30px_rgba(0,0,0,0.2)]" />
          </div>
        </div>
      </section>

      {/* Reusable Auth Modal */}
      <LoginRegister
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        closeModal={() => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  }}
  toggleMode={toggleMode}
      />
    </div>
  );
}

export default Startpage;
