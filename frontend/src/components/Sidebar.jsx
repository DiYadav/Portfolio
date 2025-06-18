import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation links (excluding Logout here)
  const navLinks = [
    { name: 'Home', path: '/Home' },
    { name: 'Profile', path: '/Profile' },
    { name: 'Projects', path: '/Projects' },
    { name: 'Skills', path: '/Skills' },
    { name: 'Contact', path: '/Contact' },
    { name: 'About me', path: '/AboutMe' },
  ];

  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-blue-100 text-blue-600 font-semibold'
      : 'text-gray-700';
  };

  const handleLogout = async () => {
    try {
      // Make POST request to your Django logout endpoint
      await axios.post('http://localhost:8000/logout/', {}, {
        withCredentials: true, // Important for session-based auth
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Clear local storage or session as needed
      localStorage.clear();

      // Navigate to login/start page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative h-screen w-[350px] bg-cyan-300 text-white flex flex-col items-center py-10 rounded-lg shadow-lg">
      {/* Profile Picture */}
      <img
        src="/dinesh.jpg"
        alt="Profile"
        className="w-32 h-32 rounded-full border-2 border-black shadow-md"
      />

      {/* Name and Role */}
      <h1 className="mt-6 text-lg text-black font-serif">Dinesh Yadav</h1>
      <h2 className="mt-2 text-sm text-black font-serif">Backend Developer</h2>

      {/* Navigation Links */}
      <nav className="mt-10 w-full items-center px-6 space-y-4">
        {navLinks.map((link) => (
          <Link
            to={link.path}
            key={link.name}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 ${isActive(link.path)}`}
          >
            <span>{link.name}</span>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full text-left px-4 py-2 rounded-lg text-red-700 hover:bg-red-100"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
