import React, { useState } from 'react';

const Experience = () => {
  const [experiences, setExperiences] = useState([
    {
      year: '2024 - Present',
      role: 'Frontend Developer - TechNova Pvt Ltd',
      location: 'Pune, India',
      details: 'React, Tailwind CSS, REST APIs',
    },
  ]);

  const [formData, setFormData] = useState({
    year: '',
    role: '',
    location: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (formData.year && formData.role && formData.location && formData.details) {
      setExperiences((prev) => [...prev, formData]);
      setFormData({ year: '', role: '', location: '', details: '' });
    }
  };

  const handleDelete = (index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="text-white flex w-[900px] right-11 mt-1 px-4">
      <div className="bg-[#0f172a] p-6 rounded-md w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Add Experience Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">Add Experience</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <input
              type="text"
              name="year"
              placeholder="Year (e.g., 2023 – 2024)"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="text"
              name="role"
              placeholder="Role and Company"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="text"
              name="details"
              placeholder="Technologies or Details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded"
            >
              Add
            </button>
          </form>
        </div>

        {/* Right: Experience List */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Experience</h2>
          <div className="relative pl-6 h-[480px] overflow-y-auto scrollbar-hide pr-2">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-cyan-400 rounded-full"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-6 flex items-start group">
                <div className="w-4 h-4 bg-[#0f172a] border-4 border-cyan-400 rounded-full mt-2 mr-4 z-10"></div>
                <div className="bg-gray-800 p-4 rounded-md w-full relative">
                  <p className="text-cyan-400 font-semibold text-sm">{exp.year}</p>
                  <h3 className="text-white font-bold">{exp.role}</h3>
                  <p className="text-gray-300 text-sm">{exp.location}</p>
                  <p className="text-gray-400 text-xs mt-1">{exp.details}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Experience;
