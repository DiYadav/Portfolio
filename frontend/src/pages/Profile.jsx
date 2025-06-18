import React, { useState } from 'react';
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Dinesh Yadav',
    email: 'dinesh@example.com',
    phone: '9876543210',
    bio: 'Backend Developer passionate about crafting robust APIs.',
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [links, setLinks] = useState(['http://resume.com']);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // keep File object directly
    }
  };
  


  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const handleLinkChange = (index, e) => {
    const newLinks = [...links];
    newLinks[index] = e.target.value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("full_name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("links", JSON.stringify(links));

    if (photo) {
      formDataToSend.append("image", photo);
    }

    if (resume) {
      formDataToSend.append("document", resume);
    }

    try {
      const response = await fetch("http://localhost:8000/api/profiles/", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile saved:", data);
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        console.error("Error saving profile:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    const { id } = useParams(); // assumes route like /edit-profile/:id

    const response = await fetch(`http://localhost:8000/api/profiles/${id}/`, {
       method: "PUT",
       body: formDataToSend,
});
  };

  return (
    <div className="absolute top-0 left-[450px] w-[1180px] h-[600px] max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-md overflow-y-auto scrollbar-hide bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Edit Profile</h2>

      <div className="text-center mb-6">
        {photo && (
          <img
            src={URL.createObjectURL(photo)}
            alt="Profile Preview"
            className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 bg-gray-700 text-white rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 bg-gray-700 text-white rounded-md"
        />

        {links.map((link, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(index, e)}
              placeholder="Link"
              className="w-full p-3 bg-gray-700 text-white rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddLink}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Add Another Link
        </button>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 bg-gray-700 text-white rounded-md"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          rows={4}
          className="w-full p-3 bg-gray-700 text-white rounded-md"
        />

        <div>
          <label className="block text-white mb-2">Upload Resume (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {resume && (
            <div className="mt-2 flex items-center space-x-4">
              <p className="text-sm text-white">Selected: {resume.name}</p>
              <button
                type="button"
                onClick={() => setResume(null)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-green-600 mb-2">Profile Updated!</h3>
            <p className="text-gray-700 mb-4">Your changes have been saved successfully.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
