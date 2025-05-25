import React, { useState } from 'react';

const Contact= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can integrate email service (e.g., EmailJS) here
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="absolute top-20 ml-15  mb-10 right-48 w-[800px] h-[650px] rounded-xl bg-gray-100 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Contact Me</h1>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Email: <a href="mailto:yadavdinesh2852002@Gmail.com" className="text-blue-500 hover:underline">yadavdinesh2852002@Gmail.com</a></p>
        <p>Phone: +91 91589 61119</p>
        <p>Location: India, Pune</p>
      </div>
    </div>
  );
};

export default Contact;
