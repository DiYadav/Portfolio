import React, { useState } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'HTML', level: 90 },
    { id: 2, name: 'CSS', level: 80 },
    { id: 3, name: 'JavaScript', level: 85 },
    { id: 4, name: 'Python', level: 70 },
  ]);

  const [newSkill, setNewSkill] = useState({ name: '', level: '' });
  const [selectedId, setSelectedId] = useState(null);

  const handleAdd = () => {
    if (!newSkill.name || !newSkill.level) return;
    const skill = { ...newSkill, id: Date.now() };
    setSkills([skill, ...skills]);
    setNewSkill({ name: '', level: '' });
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      setSkills(skills.filter((skill) => skill.id !== selectedId));
      setSelectedId(null);
    }
  };

  return (
    <div className="p-6 bg-slate-900 rounded-lg shadow-lg text-white max-w-4xl h-[400px] mx-auto mt-0 flex flex-col">
      <h2 className="text-3xl font-bold text-center mb-6">
        My <span className="text-blue-400">Skills</span>
      </h2>

      {/* Skill Bars container - scrollable */}
      <div className="flex-grow overflow-y-auto scrollbar-hide mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedId(skill.id)}
              className={`cursor-pointer p-4 bg-[#1e293b] rounded-md shadow-md ${
                selectedId === skill.id ? 'border-2 border-blue-400' : ''
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Skill - fixed below the scroll */}
      <div className="bg-[#1e293b] p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Add New Skill</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 flex-1"
          />
          <input
            type="number"
            placeholder="Level (%)"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 w-32"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
