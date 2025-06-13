import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'

// import Mainlayout from './Pages/Mainlayout'
import Home from './pages/Home'
import AboutMe from './Pages/AboutMe'
import Startpage from './Pages/Startpage'
import Sidebar from './components/Sidebar'
import Skills from './Pages/Skills'
import Contact from './Pages/Contact'
import Projects from './pages/Projects'
import Experience from './components/Experience'
import Proj from './components/Proj'
import Skill from './components/Skill'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Django server URL
axios.defaults.withCredentials = true;

function Appcontent(){
  const location= useLocation()

  const hideSidebar=location.pathname==="/" || location.pathname==="/AboutMe";

    return(
      <div flex-1 w-full>
        {!hideSidebar && <Sidebar/>}
        <Routes>
         
          <Route path="/" element={<Startpage/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Skills" element={<Skills/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Projects" element={<Projects/>}/>
          <Route path="/Experience" element={<Experience/>}/>
          <Route path="/Proj" element={<Proj/>}/>
          <Route path="/Skill" element={<Skill/>}/>
          <Route path="/AboutMe" element={<AboutMe/>}/>
        </Routes>
      </div>
    );
 }


function App() {


  return (
    <div className='w-full h-screen bg-slate-900'>
      <Router>
        <Appcontent/>
      </Router>
          
    </div>
  )
}

export default App;