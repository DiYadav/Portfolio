import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'
// import Mainlayout from './Pages/Mainlayout'
import Home from './Pages/Home'
import Startpage from './Pages/Startpage'
import Sidebar from './components/Sidebar'
import Skills from './Pages/Skills'
import Contact from './Pages/Contact'

function Appcontent(){
  const location= useLocation()

  const hideSidebar=location.pathname==="/";

    return(
      <div flex w-full>
        {!hideSidebar && <Sidebar/>}
        <Routes>
          <Route path="/" element={<Startpage/>}/>
          {/* <Route path="/main" element={<Mainlayout/>}/> */}
          <Route path="/Home" element={<Home/>}/>
          <Route path="Skills" element={<Skills/>}/>
          <Route path="Contact" element={<Contact/>}/>
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

export default App
