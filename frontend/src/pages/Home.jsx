import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';
import Hcard from '../components/Hcard';

const Home = () => {
 const [profile, setProfile] = useState(null);
 const githubLink = profile?.links?.find(link => link.includes("github"));
 const linkedinLink = profile?.links?.find(link => link.includes("linkedin"));
 const mailLink = profile?.links?.find(link => link.startsWith("mailto:")) || `mailto:${profile?.email}`;

const cards = [
  { title: "CERTIFICATES", description: profile?.skills_count || "0" },
  { title: "SKILLS", description: profile?.myskills_count || "0" },
  { title: "PROJECTS", description: profile?.myprojects_count || "0" },
];

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/my-profile/', {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Fetched profile:", res.data);  // Debug log
        setProfile(res.data);
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  return (
    <div className="absolute top-0 left-[350px] w-[1180px] h-[695px] bg-gray-50 text-gray-900">
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hi, I'm{" "}
          <span className="text-blue-600">
            {profile ? profile.full_name : "Loading..."}
          </span>
        </motion.h2>

        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          A passionate Backend Developer crafting beautiful and functional web experiences.
        </p>
        <div className="flex space-x-4 mt-6 text-gray-700 h-[50px]">
  {githubLink && (
    <a href={githubLink} target="_blank" rel="noopener noreferrer">
      <SiGithub size={24} />
    </a>
  )}
  {mailLink && (
    <a href={mailLink}>
      <HiOutlineMail size={24} />
    </a>
  )}
  {linkedinLink && (
    <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
      <SiLinkedin size={24} />
    </a>
  )}
</div>
      </section>

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
