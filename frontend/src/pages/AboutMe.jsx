import React, { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import myresume from "../assets/Dinesh_Yadav_Resume.pdf";

function AboutMe() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Handle PDF download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = myresume;
    link.download = "Dinesh_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto-scroll every 3 seconds
 useEffect(() => {
  const interval = setInterval(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const sectionWidth = container.clientWidth;
      const maxScrollLeft = container.scrollWidth - sectionWidth;

      // Stop if already at the last section
      if (container.scrollLeft >= maxScrollLeft) {
        clearInterval(interval);
        return;
      }

      container.scrollTo({
        left: container.scrollLeft + sectionWidth,
        behavior: "smooth",
      });
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);


  return (
    <div
      ref={scrollContainerRef}
      className="w-screen h-screen overflow-x-auto flex snap-x snap-mandatory scroll-smooth"
    >
      {/* Hero Section */}
      <section className="min-w-full h-screen bg-[#1b1c1e] text-white flex flex-col items-center justify-center px-6 md:px-16 py-10 snap-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I'm <span className="text-blue-400">Dinesh Yadav</span>
        </h1>
        <p className="text-xl md:text-2xl text-blue-300 mb-6">
          FullStack Developer
        </p>
        <p className="text-gray-300 max-w-2xl text-center mb-6">
          To work with an organization where I can learn new skills and increase
          my abilities...
        </p>

        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button 
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded font-semibold">
            Let's Back 
          </button>
          <button
            onClick={() => navigate("/Home")}
            className="border border-blue-400 hover:bg-blue-600 px-6 py-2 rounded font-semibold"
          >
            Let's Back Home
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://www.linkedin.com/in/dinesh-yadav-b559852b5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/DiYadav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:yadavdinesh2852002@gmail.com"
            className="text-red-400 hover:text-red-600"
          >
            <FaEnvelope />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="min-w-full h-screen bg-[#1e293b] text-white flex flex-col items-center justify-center px-6 snap-center">
        <div className="grid grid-cols-2 bg-slate-850 w-full h-screen">
          <div className="relative mt-20 justify-center justify-items-center w-[758px] h-screen">
            <h2 className="text-3xl font-bold mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
            <img
              src="/di.jpg"
              alt="Profile"
              className="w-28 h-28 mx-auto rounded-full mb-4 border-2 border-blue-400"
            />
            <p className="text-xl mb-4 font-semibold text-blue-300">
              FullStack Developer
            </p>
            <p className="text-gray-300 max-w-3xl text-center">
              To work with an organization where I can learn new skills and
              increase my abilities for the organizational goals as well as
              myself. My aim is to utilize my potential to achieve personal and
              professional goals. Eager to take on new challenges and be a part
              of a team that drives success.
            </p>
          </div>

          <div className="relative bg-slate-850 text-black justify-center justify-items-center w-[758px] h-screen">
            <div className="flex-1 mt-14 bg-slate-900 w-[600px] h-[600px] justify-items-center rounded-xl p-4">
              <span className="text-white font-mono text-lg block mb-2">
                MY RESUME
              </span>
              <iframe
                src={myresume}
                title="resume.pdf"
                className="bg-slate-500 w-[500px] h-[500px] rounded"
              ></iframe>
              <div className="bg-cyan-800  ml-15 mt-1 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                <button
                onClick={handleDownload}
                >
                Download
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-w-full h-screen bg-[#1b1c1e] text-white flex flex-col items-center justify-center px-6 snap-center">
        <h3 className="text-3xl font-bold mb-6">
          Contact <span className="text-blue-400">Me!</span>
        </h3>
        <form className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <input type="text" placeholder="Full Name" className="p-3 rounded" />
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 rounded"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="p-3 rounded"
          />
          <input
            type="text"
            placeholder="Email Subject"
            className="p-3 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 rounded col-span-1 md:col-span-2 h-32"
          ></textarea>
          <button className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold">
            Submit
          </button>
        </form>
        <footer className="text-center text-sm text-gray-500 mt-8">
          © 2025 by Dinesh Yadav. All rights reserved.
        </footer>
      </section>
    </div>
  );
}

export default AboutMe;
