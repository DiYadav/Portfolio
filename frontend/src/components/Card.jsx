import React, { useState } from "react";

const Education = () => {
  const [educationList, setEducationList] = useState([
    {
      year: "2023 - 2025",
      degree: "MCA - DIMR College, Balewadi",
      location: "Pune, India",
    },
    {
      year: "2020 - 2023",
      degree: "B.Sc(cs) - R.B. Madkholkar",
      location: "Kolhapur, India | CGPA: 8.75",
    },
    {
      year: "2018 - 2020",
      degree: "HSC - N.B. Patil Jr College",
      location: "Kolhapur, India | Marks: 62.46%",
    },
  ]);

  const [newEdu, setNewEdu] = useState({
    year: "",
    degree: "",
    location: "",
  });

  const handleChange = (e) => {
    setNewEdu({ ...newEdu, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newEdu.year && newEdu.degree && newEdu.location) {
      setEducationList([...educationList, newEdu]);
      setNewEdu({ year: "", degree: "", location: "" });
    }
  };

  const handleDelete = (index) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  return (
    <div className="text-white mt-1 ">
      <div className="bg-slate-900 flex w-[900px] h-[600px] p-6  max-w-6xl flex-col md:flex-row gap-6">

        {/* Left: Form */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-xl font-bold mb-2">Add Education</h2>
          <input
            name="year"
            value={newEdu.year}
            onChange={handleChange}
            placeholder="Year (e.g., 2020 - 2023)"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="degree"
            value={newEdu.degree}
            onChange={handleChange}
            placeholder="Degree and Institution"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="location"
            value={newEdu.location}
            onChange={handleChange}
            placeholder="Location | CGPA / Marks"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md w-full"
          >
            Add Education
          </button>
        </div>

        {/* Right: Timeline */}
        <div className="md:w-1/2 relative overflow-y-auto scrollbar-hide pr-2 pl-6 h-[560px] ">
          <h2 className="text-xl font-bold mb-4">Education Timeline</h2>
          <div className="absolute left-3 top-10 bottom-0 w-1 bg-cyan-400 rounded-full"></div>
          {educationList.map((edu, index) => (
            <div key={index} className="mb-8 flex items-start">
              <div className="w-4 h-4 bg-[#0f172a] border-4 border-cyan-400 rounded-full mt-2 mr-4 z-10"></div>
              <div className="bg-gray-800 p-4 rounded-md w-full relative">
                <p className="text-cyan-400 font-semibold text-sm">{edu.year}</p>
                <h3 className="text-white font-bold">{edu.degree}</h3>
                <p className="text-gray-300 text-sm">{edu.location}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Education;
