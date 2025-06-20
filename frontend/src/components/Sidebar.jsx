import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Helper to get CSRF token from cookies
const getCSRFToken = () => {
  const name = "csrftoken";
  const value = document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="));
  return value ? value.split("=")[1] : "";
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const profileImage = localStorage.getItem("profileImage");
  const navLinks = [
    { name: 'Home', path: '/Home' },
    { name: 'Profile', path: '/EditProfile' },
    { name: 'Projects', path: '/Projects' },
    { name: 'Skills', path: '/Skills' },
    { name: 'Contact', path: '/Contact' },
    { name: 'About me', path: '/AboutMe' },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-blue-100 text-blue-600 font-semibold'
      : 'text-gray-700';

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/my-profile/', {
        withCredentials: true,
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/logout/',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
          },
        }
      );
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative h-screen w-[350px] bg-cyan-300 text-white flex flex-col items-center py-10 rounded-lg shadow-lg">
      {/* Profile Picture */}
      {profile?.image ? (
        <img
          src={profileImage || "/default.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-black shadow-md object-cover"
        />
      ) : (
        <div className="w-32 h-32 rounded-full border-2 border-black bg-gray-300" />
      )}

      {/* Name and Role */}
      <h1 className="mt-6 text-lg text-black font-serif">{profile?.full_name || 'User Name'}</h1>
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
