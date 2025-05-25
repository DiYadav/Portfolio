import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
// import Home from './Home';

function Mainlayout() { 
  return (
    <div className='flex h-screen'>

      <main className='flex-1 bg-gray-500 overflow-auto'>
        <Sidebar/>
        <Outlet/>
      </main>
    </div>
  );
}

export default Mainlayout;
