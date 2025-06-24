import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Myskills from "../components/Myskills";

const getCSRFToken = () => {
  const name = "csrftoken";
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : "";
};

const Skills = () => {
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    certificate: "",
    description: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCertificate, setModalCertificate] = useState(null);
  const BASE_URL = "http://localhost:8000";
  const [addPopup, setAddPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/csrf/", { credentials: "include" }); // hit CSRF route
    fetchCertificates();
  }, []);

  const fetchCertificates = () => {
    axios
      .get("http://localhost:8000/api/skills/", { withCredentials: true })
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleAdd = () => {
    if (!newCertificate.certificate || !newCertificate.description) {
      alert("Both fields required");
      return;
    }

    const formData = new FormData();
    formData.append("certificate", newCertificate.certificate);
    formData.append("description", newCertificate.description);

    axios
      .post("http://localhost:8000/api/skills/", formData, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setCertificates((prev) => [res.data, ...prev]);
        setNewCertificate({ certificate: "", description: "" });
        fileInputRef.current.value = null;
        setAddPopup(true);
        setTimeout(() => setAddPopup(false), 2000);
      })
      .catch((err) => {
        console.error("Add failed:", err);
      });
  };

  const handleDelete = () => {
    if (!selectedId) return;

    axios
      .delete("http://localhost:8000/api/skills/delete/", {
        withCredentials: true,
        headers: { "X-CSRFToken": getCSRFToken() },
        data: { id: selectedId },
      })
      .then(() => {
        setCertificates((prev) =>
          prev.filter((cert) => cert.id !== selectedId)
        );
        setSelectedId(null);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
    setDeletePopup(true);
    setTimeout(() => setDeletePopup(false), 2000);
  };

  const handleSee = (certificate) => {
    setModalCertificate(certificate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalCertificate(null);
  };

  const handleShare = (cert) => {
    const fullUrl = `${BASE_URL}${cert.certificate}`;
    if (navigator.share) {
      navigator
        .share({
          title: "My Certificate",
          text: cert.description,
          url: fullUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(fullUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="absolute top-0 ml-[350px] p-4 w-[1174px] h-[350px] bg-slate-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Certificates</h2>

      <div className="flex w-[1160px] bg-slate-900 pb-4 rounded-lg">
        <div className="flex overflow-x-auto scrollbar-hide space-x-4 pr-4 w-[880px]">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`min-w-[278px] h-[250px] bg-[#1e293b] p-4 rounded-xl flex-shrink-0 ${
                selectedId === cert.id ? "border-4 border-blue-400" : ""
              }`}
              onClick={() => setSelectedId(cert.id)}
            >
              <div className="flex flex-col h-full justify-between">
                <img
                  src={`${BASE_URL}${cert.certificate}`}
                  alt="Certificate"
                  className="h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm mb-2">{cert.description}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 px-3 py-1 rounded-md text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(cert);
                    }}
                  >
                    Share
                  </button>
                  <button
                    className="bg-gray-500 px-3 py-1 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSee(cert);
                    }}
                  >
                    See
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[280px] h-[250px] bg-[#1e293b] p-4 rounded-xl flex-shrink-0 flex flex-col justify-between ml-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                certificate: e.target.files[0],
              })
            }
            className="w-full p-2 mb-2 rounded bg-slate-700 text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCertificate.description}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                description: e.target.value,
              })
            }
            className="w-full p-2 mb-2 rounded bg-slate-700 text-white"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAdd}
              className="bg-green-600 px-3 py-1 rounded-md w-1/2"
            >
              Add
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 px-3 py-1 rounded-md w-1/2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && modalCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-slate-900 text-black p-6 rounded-xl shadow-xl w-[700px] h-[500px] max-w-[90%] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded"
            >
              Close
            </button>
            <img
              src={`${BASE_URL}${modalCertificate.certificate}`}
              alt="Certificate"
              className="w-full h-[400px] object-contain rounded mb-4"
            />
            <p className="text-lg font-medium text-white">
              {modalCertificate.description}
            </p>
          </div>
        </div>
      )}

      {addPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-green-600 mb-2">
              Certificate Added!
            </h3>
            <p className="text-gray-700 mb-4">
              Your changes have been saved successfully.
            </p>
            <button
              onClick={() => {
                setAddPopup(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {deletePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-red-600 mb-2">
              Certificate Deleted!
            </h3>
            <p className="text-gray-700 mb-4">
              Your changes have been saved successfully.
            </p>
            <button
              onClick={() => {
                setDeletePopup(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Myskills />
    </div>
  );
};

export default Skills;
