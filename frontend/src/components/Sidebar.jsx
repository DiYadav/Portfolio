import { Link ,useLocation} from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation(); // For checking the active route

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/Home' },
    { name: 'Projects', path: '/Projects' },
    { name: 'Skills', path: '/Skills' },
    { name: 'Contact', path: '/Contact' },
    { name:'About me', path:'/AboutMe'},
  ];

  // Function to apply active class to the current route
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700';
  };

  return (
    <div className="relative h-screen w-[350px] bg-cyan-300 text-white flex flex-col items-center py-10 rounded-lg shadow-lg">
      <img
        src="/dinesh.jpg"
        alt="Profile"
        className="w-32 h-32 rounded-full  border-2 border-black shadow-md"
      />
      <h1 className="mt-6 text-lg text-black font-serif">Dinesh Yadav</h1>
      <h2 className="mt-2 text-sm  text-black font-serif">Backend Developer</h2>

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
            </nav>
    </div>
  );
};

export default Sidebar;