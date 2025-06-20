import { useState, useEffect } from "react";
import axios from "axios";

const getCSRFToken = () => {
  const name = "csrftoken";
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : "";
};

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [newEdu, setNewEdu] = useState({
    year: "",
    degree: "",
    institute: "",
    location: "",
    cgpa_marks: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const fetchEducations = () => {
    axios
      .get("http://localhost:8000/api/educations/", { withCredentials: true })
      .then((res) => setEducationList(res.data))
      .catch((err) => console.error("Failed to fetch", err));
  };

  useEffect(() => {
    // Get CSRF token and education data
    fetch("http://localhost:8000/api/csrf/", { credentials: "include" });
    fetchEducations();
  }, []);

  const handleChange = (e) => {
    setNewEdu({ ...newEdu, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
  let { year, degree, institute, location, cgpa_marks } = newEdu;

  // Clean the year input: remove spaces
  const cleanYear = year.replace(/\s+/g, '');

  // Validate year format
  if (!cleanYear.match(/^\d{4}-\d{4}$/)) {
    setErrorMsg("Year must be in YYYY-YYYY format.");
    return;
  }

  // Validate CGPA
  if (isNaN(parseFloat(cgpa_marks))) {
    setErrorMsg("CGPA/Marks must be a valid number.");
    return;
  }

  // Validate all fields are filled
  if (cleanYear && degree && institute && location && cgpa_marks) {
    axios
      .post(
        "http://localhost:8000/api/educations/",
        {
          year: cleanYear,
          degree,
          institute,
          location,
          cgpa_marks: parseFloat(cgpa_marks), // Use lowercase field name if model is updated
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        }
      )
      .then(() => {
        setNewEdu({ year: "", degree: "", institute: "", location: "", cgpa_marks: "" });
        setErrorMsg("");
        fetchEducations();
      })
      .catch((err) => {
        console.error("Add failed", err.response?.data || err.message);
        setErrorMsg("Error: " + JSON.stringify(err.response?.data || "Something went wrong"));
      });
  } else {
    setErrorMsg("All fields are required.");
  }
};



  const handleDelete = (index, id) => {
    axios
      .delete("http://localhost:8000/api/educations/delete/", {
        data: { id:id },
        withCredentials: true,
        headers: { "X-CSRFToken": getCSRFToken() },
      })
      .then(() => {
        const updated = [...educationList];
        updated.splice(index, 1);
        setEducationList(updated);
      })
      .catch((err) => console.error("Delete failed", err));
  };

  return (
    <div className="text-white mt-1">
      <div className="bg-slate-900 flex w-[900px] h-[600px] p-6 max-w-6xl flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-xl font-bold mb-2">Add Education</h2>
          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
          <input
            name="year"
            value={newEdu.year}
            onChange={handleChange}
            placeholder="Year (e.g., 2020-2023)"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="degree"
            value={newEdu.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="institute"
            value={newEdu.institute}
            onChange={handleChange}
            placeholder="Institution"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="location"
            value={newEdu.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="cgpa_marks"
            value={newEdu.cgpa_marks}
            onChange={handleChange}
            placeholder="CGPA / Marks"
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
        <div className="md:w-1/2 relative overflow-y-auto scrollbar-hide pr-2 pl-6 h-[560px]">
          <h2 className="text-xl font-bold mb-4">Education Timeline</h2>
          <div className="absolute left-3 top-10 bottom-0 w-1 bg-cyan-400 rounded-full"></div>
          {educationList.map((edu, index) => (
            <div key={edu.id} className="mb-8 flex items-start">
              <div className="w-4 h-4 bg-[#0f172a] border-4 border-cyan-400 rounded-full mt-2 mr-4 z-10"></div>
              <div className="bg-gray-800 p-4 rounded-md w-full relative">
                <p className="text-cyan-400 font-semibold text-sm">{edu.year || "N/A"}</p>
                <h3 className="text-white font-bold">{edu.degree}</h3>
                <h3 className="text-white font-bold">{edu.institute}</h3>
                <p className="text-gray-300 text-sm">{edu.location}</p>
                <p className="text-gray-300 text-sm">{edu.cgpa_marks}</p>
                <button
                  onClick={() => handleDelete(index, edu.id)}
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
