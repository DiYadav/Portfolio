import { Routes, Route } from 'react-router-dom'; // fixed import
import Home from './pages/Home';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 flex justify-center items-center bg-black p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
