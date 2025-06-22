import React, { useState, useEffect } from "react";
import axios from "axios";

const getCSRFToken = () => {
  const name = "csrftoken";
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : "";
};

const Proj = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    year: "",
    title: "",
    location: "",
    contributer: "",
    details: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const fetchprojects = () => {
    axios
      .get("http://localhost:8000/api/projects/", { withCredentials: true })
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Fetch Failed", err));
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/csrf/", { credentials: "include" });
    fetchprojects();
  }, []);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const { year, title, location, contributer, details } = newProject;
    const cleanYear = year.replace(/\s+/g, "");

    if (!cleanYear.match(/^\d{4}-\d{4}$/)) {
      setErrorMsg("Year must be in YYYY-YYYY format.");
      return;
    }
    if (!title || !location || !contributer || !details) {
      setErrorMsg("All fields are required.");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/projects/",
        { ...newProject, year: cleanYear },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": getCSRFToken() },
        }
      )
      .then((res) => {
        setProjects((prev) => [...prev, res.data]);
        setNewProject({ year: "", title: "", location: "", contributer: "", details: "" });
        setErrorMsg("");
      })
      .catch((err) => {
        console.error("Add failed", err.response?.data || err.message);
        setErrorMsg("Error: " + JSON.stringify(err.response?.data || "Something went wrong"));
      });
  };

  const handleDelete = (index, id) => {
    axios
      .delete("http://localhost:8000/api/projects/delete/", {
        data: { id },
        withCredentials: true,
        headers: { "X-CSRFToken": getCSRFToken() },
      })
      .then(() => {
        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);
      })
      .catch((err) => console.error("Delete failed", err));
  };

  return (
    <div className="text-white flex w-[900px] mt-7 px-4">
      <div className="bg-[#0f172a] p-6 rounded-md w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Add Project</h2>
          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
          <div className="space-y-4">
            <input name="year" value={newProject.year} onChange={handleChange} placeholder="Year" className="w-full p-2 rounded bg-gray-700 text-white outline-none" />
            <input name="title" value={newProject.title} onChange={handleChange} placeholder="Project Title" className="w-full p-2 rounded bg-gray-700 text-white outline-none" />
            <input name="location" value={newProject.location} onChange={handleChange} placeholder="Location" className="w-full p-2 rounded bg-gray-700 text-white outline-none" />
            <input name="contributer" value={newProject.contributer} onChange={handleChange} placeholder="Contributor" className="w-full p-2 rounded bg-gray-700 text-white outline-none" />
            <textarea name="details" value={newProject.details} onChange={handleChange} placeholder="Description / Tech Used" className="w-full p-2 rounded bg-gray-700 text-white outline-none" rows={3} />
            <button onClick={handleAdd} className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded">Add Project</button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Projects</h2>
          <div className="relative pl-6 h-[480px] overflow-y-auto scrollbar-hide pr-2">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-cyan-400 rounded-full"></div>
            {projects.map((project, index) => (
              <div key={project.id || index} className="mb-6 flex items-start group">
                <div className="w-4 h-4 bg-[#0f172a] border-4 border-cyan-400 rounded-full mt-2 mr-4 z-10"></div>
                <div className="bg-gray-800 p-4 rounded-md w-full relative">
                  <p className="text-cyan-400 font-semibold text-sm">{project.year}</p>
                  <h3 className="text-white font-bold">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.location}</p>
                  <p className="text-gray-300 text-sm">{project.contributer}</p>
                  <p className="text-gray-400 text-xs mt-1">{project.details}</p>
                  <button onClick={() => handleDelete(index, project.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm" title="Delete">✕</button>
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
