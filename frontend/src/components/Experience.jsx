import React, { useState, useEffect } from "react";
import axios from "axios";

const getCSRFToken = () => {
  const name = "csrftoken";
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : "";
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    role: "",
    company: "",
    location: "",
    tech_details: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const fetchExperiences = () => {
    axios
      .get("http://localhost:8000/api/experiences/", { withCredentials: true })
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error("Fetch failed", err));
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/csrf/", { credentials: "include" });
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    const { year, role, company, location, tech_details } = formData;
    const cleanYear = year.replace(/\s+/g, "");

    if (!cleanYear.match(/^\d{4}-\d{4}$/)) {
      setErrorMsg("Year must be in YYYY-YYYY format.");
      return;
    }

    if (!role || !company || !location || !tech_details) {
      setErrorMsg("All fields are required.");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/experiences/",
        { ...formData, year: cleanYear },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": getCSRFToken() },
        }
      )
      .then((res) => {
        setExperiences((prev) => [...prev, res.data]);
        setFormData({
          year: "",
          role: "",
          company: "",
          location: "",
          tech_details: "",
        });
        setErrorMsg("");
      })
      .catch((err) => {
        console.error("Add failed", err.response?.data || err.message);
        setErrorMsg("Error: " + JSON.stringify(err.response?.data || "Something went wrong"));
      });
  };

  const handleDelete = async (index, id) => {
  try {
    await axios.delete("http://localhost:8000/api/experiences/delete/", {
      data: { id },
      withCredentials: true,
      headers: { "X-CSRFToken": getCSRFToken() },
    });
    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  return (
    <div className="text-white mt-1">
      <div className="bg-slate-900 flex w-[900px] h-[600px] p-6 max-w-6xl flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-xl font-bold mb-2">Add Experience</h2>
          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year (e.g., 2020-2023)"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="tech_details"
            value={formData.tech_details}
            onChange={handleChange}
            placeholder="Technologies or Details"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md w-full"
          >
            Add Experience
          </button>
        </div>

        {/* Right: Timeline */}
        <div className="md:w-1/2 relative overflow-y-auto scrollbar-hide pr-2 pl-6 h-[560px]">
          <h2 className="text-xl font-bold mb-4">Experience Timeline</h2>
          <div className="absolute left-3 top-10 bottom-0 w-1 bg-cyan-400 rounded-full"></div>
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-8 flex items-start">
              <div className="w-4 h-4 bg-[#0f172a] border-4 border-cyan-400 rounded-full mt-2 mr-4 z-10"></div>
              <div className="bg-gray-800 p-4 rounded-md w-full relative">
                <p className="text-cyan-400 font-semibold text-sm">{exp.year}</p>
                <h3 className="text-white font-bold">{exp.role}</h3>
                <h3 className="text-white font-bold">{exp.company}</h3>
                <p className="text-gray-300 text-sm">{exp.location}</p>
                <p className="text-gray-400 text-xs mt-1">{exp.tech_details}</p>
                <button
                  onClick={() => handleDelete(index, exp.id)}
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

export default Experience;
