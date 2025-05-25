import React from 'react'
// import './index.css'

function Card() {
  return (
    // <div className='grid col-auto w-[800px] h-[596px] p-4  bg-blue-950 rounded-2xl text-white'>
     
    <section class="bg-[#0f172a]  w-[800px] border scroll-hide text-white p-6 rounded-lg">
   <h2 class="text-xl font-bold mb-6">Education Details</h2>
 

  {/* <!-- Timeline wrapper --> */}
  <div class="border-l-4 border-cyan-400 pl-6 space-y-6">

    {/* <!-- MCA --> */}
    <div class="relative bg-slate-800 p-4 rounded-md shadow-lg">
      <div class="absolute -left-3 top-4 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white"></div>
      <p class="text-sm text-cyan-300 font-semibold">2023 - 2025</p>
      <h3 class="text-lg font-bold">MCA - DIMR College, Balewadi</h3>
      <p class="text-sm text-gray-300">Pune, India</p>
    </div>

    {/* <!-- B.Sc(cs) --> */}
    <div class="relative bg-slate-800 p-4 rounded-md shadow-lg">
      <div class="absolute -left-3 top-4 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white"></div>
      <p class="text-sm text-cyan-300 font-semibold">2020 - 2023</p>
      <h3 class="text-lg font-bold">B.Sc(cs) - R.B. Madkholkar</h3>
      <p class="text-sm text-gray-300">Kolhapur, India | CGPA: 8.75</p>
    </div>

    {/* <!-- HSC --> */}
    <div class="relative bg-slate-800 p-4 rounded-md shadow-lg">
      <div class="absolute -left-3 top-4 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white"></div>
      <p class="text-sm text-cyan-300 font-semibold">2018 - 2020</p>
      <h3 class="text-lg font-bold">HSC - N.B. Patil Jr College</h3>
      <p class="text-sm text-gray-300">Kolhapur, India | Marks: 62.46%</p>
    </div>

  </div>
</section>
  
    
    // </div>
   
  )
}

export default Card;
