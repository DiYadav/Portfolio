import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//this is component
const getCSRFToken = () => {
  const name = "csrftoken";
  const value = document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="));
  return value ? value.split("=")[1] : "";
};

//this is second component
const EditProfile = () => {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    position:'',
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [existingPhotoURL, setExistingPhotoURL] = useState('');
  const [existingResumeURL, setExistingResumeURL] = useState('');
  const [links, setLinks] = useState(['']);
  const [showPopup, setShowPopup] = useState(false);

  const fetchProfileData = () => {
    fetch('http://localhost:8000/api/my-profile/', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => {
        setFormData({
          fullName: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          position:data.position || '',
        });
        setLinks(data.links || ['']);
        if (data.image) setExistingPhotoURL(`http://localhost:8000${data.image}`);
        if (data.document) setExistingResumeURL(`http://localhost:8000${data.document}`);
        setPhoto(null);
        setResume(null);
      })
      .catch((err) => console.error("Error loading profile:", err));
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/csrf/', { method: 'GET', credentials: 'include' });
    fetchProfileData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  const handleResumeChange = (e) => setResume(e.target.files[0]);
  const handleLinkChange = (i, e) => setLinks(links.map((l, idx) => idx === i ? e.target.value : l));
  const handleAddLink = () => setLinks([...links, '']);
  const handleRemoveLink = (i) => setLinks(links.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("full_name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("links", JSON.stringify(links));
    if (photo) formDataToSend.append("image", photo);
    if (resume) formDataToSend.append("document", resume);

    const response = await fetch("http://localhost:8000/api/my-profile/", {
      method: "PUT",
      headers: { "X-CSRFToken": getCSRFToken() },
      credentials: "include",
      body: formDataToSend,
    });

   if (response.ok) {
  const data = await response.json();  // get the updated profile data
  if (data.image) {
    localStorage.setItem("profileImage", `http://localhost:8000${data.image}`);
  }
  setShowPopup(true);
}
  }

  return (
    <div className="absolute top-0 left-[450px] w-[1180px] h-[600px] max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-md overflow-y-auto scrollbar-hide bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          {photo ? (
            <img src={URL.createObjectURL(photo)} alt="Preview" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
          ) : existingPhotoURL ? (
            <img src={existingPhotoURL} alt="Uploaded" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
          ) : null}
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Your Role" className="w-full p-3 bg-gray-700 text-white rounded-md" />
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-700 text-white rounded-md" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 bg-gray-700 text-white rounded-md" />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 bg-gray-700 text-white rounded-md" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" rows={4} className="w-full p-3 bg-gray-700 text-white rounded-md" />

        {links.map((link, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={link} onChange={(e) => handleLinkChange(i, e)} placeholder="Link" className="w-full p-3 bg-gray-700 text-white rounded-md" />
            <button type="button" onClick={() => handleRemoveLink(i)} className="bg-red-500 text-white px-3 py-2 rounded-md">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddLink} className="px-4 py-2 bg-green-600 text-white rounded-md">Add Link</button>

        <div>
          <label className="text-white">Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {resume ? (
            <p className="text-sm text-white mt-2">Selected: {resume.name}</p>
          ) : existingResumeURL ? (
            <a href={existingResumeURL} target="_blank" rel="noreferrer" className="text-sm text-blue-300 underline mt-2 block">View Existing Resume</a>
          ) : null}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Save Changes</button>
      </form>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-green-600 mb-2">Profile Updated!</h3>
            <p className="text-gray-700 mb-4">Your changes have been saved successfully.</p>
            <button onClick={() => { setShowPopup(false); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
