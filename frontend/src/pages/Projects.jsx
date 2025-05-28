import { useState } from "react";
import { GraduationCap,FolderGit2, UserRoundCog } from "lucide-react"; 
import Card from "../components/Card";
import Experience from "../components/Experience";
import Proj from "../components/Proj";

const tabs = [
  { id: 0, label: "EDUCATION", icon: <GraduationCap className="w-5 h-5" /> },
  { id: 1, label: "EXPERIENCE", icon: <UserRoundCog className="w-5 h-5" /> },
  { id: 2, label: "PROJECTS", icon: <FolderGit2 className="w-5 h-5" /> },
];

function Projects() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="absolute top-8 left-[500px] w-full max-w-md mx-auto mt-10">
      <div className="flex justify-around  border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition duration-200 ${
              activeTab === tab.id
                ? "text-white border-b-2"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area (Optional) */}
      <div className="mt-6 text-center text-gray-700">
        {activeTab === 0 && <p className="flex  "><Card/></p>}
        {activeTab === 1 && <p><Experience/></p>}
        {activeTab === 2 && <p><Proj/></p>}
      </div>
    </div>
  );
}

export default Projects;
