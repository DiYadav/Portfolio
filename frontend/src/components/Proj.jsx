import React, { useState } from "react";

const Proj = () => {
  const [projects, setProjects] = useState([
    {
      year: "2025",
      title: "DvChat - Face Recognition Social App",
      location: "Solo Project",
      details:
        "A Django + React-based app allowing face login, chatting, and profile creation using OpenCV and MySQL.",
    },
  ]);

  const [newProject, setNewProject] = useState({
    year: "",
    title: "",
    location: "",
    details: "",
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newProject.year && newProject.title) {
      setProjects([...projects, newProject]);
      setNewProject({ year: "", title: "", location: "", details: "" });
    }
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="text-white flex w-[900px] mt-10 px-4">
      <div className="bg-[#0f172a] p-6 rounded-md w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left: Add Project Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">Add Project</h2>
          <div className="space-y-4">
            <input
              name="year"
              value={newProject.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              name="title"
              value={newProject.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              name="location"
              value={newProject.location}
              onChange={handleChange}
              placeholder="Location or Team"
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
            <textarea
              name="details"
              value={newProject.details}
              onChange={handleChange}
              placeholder="Description / Tech Used"
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              rows={3}
            />
            <button
              onClick={handleAdd}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Right: Project Timeline */}
        <div>
          <h2 className="text-xl font-bold mb-4  text-center">Projects</h2>
          <div className="relative pl-6 h-[480px] overflow-y-auto scrollbar-hide pr-2">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-cyan-400 rounded-full"></div>
            {projects.map((project, index) => (
              <div key={index} className="mb-6 flex items-start group">
                <div className="w-4 h-4 bg-[#0f172a] border-4 border-cyan-400 rounded-full mt-2 mr-4 z-10"></div>
                <div className="bg-gray-800 p-4 rounded-md w-full relative">
                  <p className="text-cyan-400 font-semibold text-sm">{project.year}</p>
                  <h3 className="text-white font-bold">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.location}</p>
                  <p className="text-gray-400 text-xs mt-1">{project.details}</p>
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

export default Proj;
