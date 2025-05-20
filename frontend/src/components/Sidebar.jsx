import React from 'react';
import { Link, useLocation } from 'react-router'; // For navigation
import '../Sidebar.css';


// Sidebar component
const Sidebar = () => {
  const location = useLocation(); // For checking the active route

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/Profile' },
    { name: 'Skills', path: '/Skills' },
    { name: 'Projects', path: '/Projects' },
    { name: 'Contact', path: '/Contact' },
  ];

  // Function to apply active class to the current route
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700';
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-6">
      {/* Profile Picture */}
      <div className="text-center">
        <img
          src="/dinesh.jpg" // Use your profile picture URL here
          alt="Profile"    
          className="w-24 h-24 rounded-full mx-auto"/>
        <h2 className="text-gray-500 text-sm">Dinesh Yadav</h2>
        <p className="text-gray-500 text-sm">Backend Developer</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-10 space-y-4">
        {navLinks.map((link) => (
          <Link
            to={link.path}
            key={link.name}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 ${isActive(link.path)}`}
          >
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
