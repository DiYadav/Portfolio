import React, { useEffect, useState } from "react";
import axios from "axios";

const getCSRFToken = () => {
  const name = "csrftoken";
  const cookie = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : "";
};

const Myskills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ skills: "", proficiency: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const fetchSkills = () => {
    axios
      .get("http://localhost:8000/api/myskills/", { withCredentials: true })
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/csrf/", { credentials: "include" });
    fetchSkills();
  }, []);

  const handleAdd = () => {
    const { skills: name, proficiency } = newSkill;
    if (!name || !proficiency || proficiency < 1 || proficiency > 100) {
      setError("Enter valid skill and level (1-100)");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/myskills/",
        { skills: name, proficiency },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": getCSRFToken() },
        }
      )
      .then((res) => {
        setSkills((prev) => [res.data, ...prev]);
        setNewSkill({ skills: "", proficiency: "" });
        setError("");
      })
      .catch((err) => {
        console.error("Add Error:", err.response?.data || err.message);
        setError("Add failed.");
      });
  };

  const handleDelete = () => {
    if (!selectedId) return;

    axios
      .delete("http://localhost:8000/api/myskills/delete/", {
        data: { id: selectedId },
        withCredentials: true,
        headers: { "X-CSRFToken": getCSRFToken() },
      })
      .then(() => {
        setSkills((prev) => prev.filter((s) => s.id !== selectedId));
        setSelectedId(null);
      })
      .catch((err) => console.error("Delete Error:", err));
  };

  return (
    <div className="p-6 bg-slate-900 rounded-lg shadow-lg text-white max-w-4xl h-[400px] mx-auto mt-0 flex flex-col">
      <h2 className="text-3xl font-bold text-center mb-6">
        My <span className="text-blue-400">Skills</span>
      </h2>

      <div className="flex-grow overflow-y-auto scrollbar-hide mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedId(skill.id)}
              className={`cursor-pointer p-4 bg-[#1e293b] rounded-md shadow-md ${
                selectedId === skill.id ? "border-2 border-blue-400" : ""
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.skills}</span>
                <span>{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1e293b] p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Add New Skill</h3>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={newSkill.skills}
            onChange={(e) => setNewSkill({ ...newSkill, skills: e.target.value })}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 flex-1"
          />
          <input
            type="number"
            placeholder="Level (%)"
            value={newSkill.proficiency}
            onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 w-32"
          />
          <button onClick={handleAdd} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
            Add
          </button>
          <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myskills;
