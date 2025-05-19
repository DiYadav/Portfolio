import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen absolute top-0 left-0 bg-white-100 px-6 py-12">
      <div className="max-w-5xl w-full bg-white p-10 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Contact Info */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-blue-600">📧</span>
              <span>yadavdinesh2852002@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">📍</span>
              <span>Pune, India</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Your message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
    </div>
  );
}

export default Contact;
