import React, { useState } from 'react';
import Skill from '../components/Skill';

const Skills = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
      description: 'Certificate 1 Description',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      description: 'Certificate 2 Description',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/200',
      description: 'Certificate 3 Description',
    },
  ]);

  const [newCertificate, setNewCertificate] = useState({ image: '', description: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCertificate, setModalCertificate] = useState(null);

  const handleAdd = () => {
    if (!newCertificate.image || !newCertificate.description) return;
    const newCert = { ...newCertificate, id: Date.now() };
    setCertificates([newCert, ...certificates]);
    setNewCertificate({ image: '', description: '' });
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      setCertificates(certificates.filter((cert) => cert.id !== selectedId));
      setSelectedId(null);
    }
  };

  const handleSee = (certificate) => {
    setModalCertificate(certificate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalCertificate(null);
  };

  return (
    <div className="absolute top-0 ml-[350px] p-4 w-[1174px] h-[350px] bg-slate-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Certificates</h2>

      <div className="flex w-[1160px] bg-slate-900 pb-4 rounded-lg">
        {/* Scrollable Section */}
        <div className="flex overflow-x-auto scrollbar-hide space-x-4 pr-4 w-[880px]">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`min-w-[278px] h-[250px] bg-[#1e293b] p-4 rounded-xl flex-shrink-0 transition-all duration-300 ${
                selectedId === cert.id ? 'border-4 border-blue-400' : ''
              }`}
              onClick={() => setSelectedId(cert.id)}
            >
              <div className="flex flex-col h-full justify-between">
                <img
                  src={cert.image}
                  alt="Certificate"
                  className="h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm mb-2">{cert.description}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 px-3 py-1 rounded-md text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator
                          .share({
                            title: 'Certificate',
                            text: cert.description,
                            url: cert.image,
                          })
                          .catch((error) => console.error('Error sharing', error));
                      } else {
                        navigator.clipboard.writeText(cert.image);
                        alert('Link copied to clipboard! (Browser does not support sharing)');
                      }
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

        {/* Add/Delete Section */}
        <div className="w-[280px] h-[250px] bg-[#1e293b] p-4 rounded-xl flex-shrink-0 flex flex-col justify-between ml-auto">
          <div>
            {/* File Input for Image */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewCertificate({ ...newCertificate, image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full p-2 mb-2 rounded bg-slate-700 text-white"
            />

            {/* Description Input */}
            <input
              type="text"
              placeholder="Description"
              value={newCertificate.description}
              onChange={(e) =>
                setNewCertificate({ ...newCertificate, description: e.target.value })
              }
              className="w-full p-2 mb-2 rounded bg-slate-700 text-white placeholder-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            <button onClick={handleAdd} className="bg-green-600 px-3 py-1 rounded-md w-1/2">
              Add
            </button>
            <button onClick={handleDelete} className="bg-red-600 px-3 py-1 rounded-md w-1/2">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && modalCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-slate-900 ml[900px] text-black p-6 rounded-xl shadow-xl w-[700px] h-[500px] max-w-[90%] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded"
            >
              Close
            </button>
            <img
              src={modalCertificate.image}
              alt="Certificate"
              className="w-full h-[400px] object-contain rounded mb-4"
            />
            <p className="text-lg font-medium text-white">{modalCertificate.description}</p>
          </div>
        </div>
      )}
      <Skill/>
    </div>
    
  );
};

export default Skills;
