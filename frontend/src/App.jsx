import { useState } from 'react';
import './App.css';
import{Routes,Route} from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import Contact from './pages/Contact';

function App() {
  return (
<div className="flex">
<div className="flex-1 p-10">
<Sidebar/> 
     <Routes>
      <Route path=""  element={<Home/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path='/Contact' element={<Contact/>}/>
     </Routes>
     </div>
    </div>

  )
}

export default App
