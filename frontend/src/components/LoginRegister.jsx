// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginRegister = ({ isLoginOpen, isRegisterOpen, closeModal, toggleMode }) => {
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({ username: "", password: "" });
//   const [registerData, setRegisterData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     password2: "",
//   });

//   const handleChangeLogin = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleChangeRegister = (e) => {
//     const { name, value } = e.target;
//     setRegisterData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/login/",
//         loginData,
//         { withCredentials: true }
//       );
//       if (res.status === 200) {
//         const { user_id, profile_id, username, email } = res.data;
//         localStorage.setItem("user_id", user_id);
//         localStorage.setItem("profile_id", profile_id);
//         localStorage.setItem("username", username);
//         localStorage.setItem("email", email);
//         console.log("Login successful:", res.data);
//         closeModal();
//         navigate("/Home");
//       }
//     } catch (error) {
//       console.error("Login failed:", error.response?.data?.error || error.message);
//       alert("Login failed: " + (error.response?.data?.error || error.message));
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (registerData.password !== registerData.password2) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/register/",
//         registerData,
//         { withCredentials: true }
//       );
//       if (res.status === 201 || res.status === 200) {
//         const { user_id, profile_id, username, email } = res.data;
//         localStorage.setItem("user_id", user_id);
//         localStorage.setItem("profile_id", profile_id);
//         localStorage.setItem("username", username);
//         localStorage.setItem("email", email);
//         console.log("Registration successful:", res.data);
//         closeModal();
//         navigate("/Home");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error.response?.data?.error || error.message);
//       alert("Registration failed: " + (error.response?.data?.error || error.message));
//     }
//   };

//   if (!isLoginOpen && !isRegisterOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
//       <div className="bg-[#0f0f0f] rounded-xl p-6 w-[90%] max-w-md relative">
//         <button onClick={closeModal} className="absolute top-2 right-3 text-white text-xl">×</button>

//         <h2 className="text-white text-2xl font-semibold mb-6 text-center">
//           {isLoginOpen ? "Login" : "Register"}
//         </h2>

//         {isLoginOpen && (
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               name="username"
//               value={loginData.username}
//               onChange={handleChangeLogin}
//               placeholder="Username"
//               className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
//             />
//             <input
//               name="password"
//               type="password"
//               value={loginData.password}
//               onChange={handleChangeLogin}
//               placeholder="Password"
//               className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
//             />
//             <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
//               Login
//             </button>
//           </form>
//         )}

//         {isRegisterOpen && (
//           <form onSubmit={handleRegister} className="space-y-4">
//             <input
//               name="username"
//               value={registerData.username}
//               onChange={handleChangeRegister}
//               placeholder="Username"
//               className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
//             />
//             <input
//               name="email"
//               value={registerData.email}
//               onChange={handleChangeRegister}
//               placeholder="Email"
//               className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
//             />
//             <input
//               name="password"
//               type="password"
//               value={registerData.password}
//               onChange={handleChangeRegister}
//               placeholder="Password"
//               className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
//             />
//             <input
//               name="password2"
//               type="password"
//               value={registerData.password2}
//               onChange={handleChangeRegister}
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
//             />
//             <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
//               Register
//             </button>
//           </form>
//         )}

//         <div className="text-center text-gray-400 text-sm mt-6">
//           {isLoginOpen ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button onClick={toggleMode} className="text-pink-500 hover:underline">
//             {isLoginOpen ? "Register" : "Login"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ isLoginOpen, isRegisterOpen, closeModal, toggleMode }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Use FormData to match Django's request.POST.get()
      const formData = new FormData();
      formData.append("username", loginData.username);
      formData.append("password", loginData.password);

      const res = await axios.post("http://localhost:8000/api/login/", formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        const { user_id, profile_id, username, email } = res.data;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("profile_id", profile_id || ""); // profile_id is optional
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        console.log("Login successful:", res.data);
        closeModal();
        navigate("/Home");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.error || error.message);
      alert("Login failed: " + (error.response?.data?.error || error.message));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/register/", registerData, {
        withCredentials: true,
      });

      if (res.status === 201 || res.status === 200) {
        const { user_id, profile_id, username, email } = res.data;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("profile_id", profile_id || "");
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        console.log("Registration successful:", res.data);
        closeModal();
        navigate("/Home");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.error || error.message);
      alert("Registration failed: " + (error.response?.data?.error || error.message));
    }
  };

  if (!isLoginOpen && !isRegisterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#0f0f0f] rounded-xl p-6 w-[90%] max-w-md relative">
        <button onClick={closeModal} className="absolute top-2 right-3 text-white text-xl">×</button>

        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          {isLoginOpen ? "Login" : "Register"}
        </h2>

        {isLoginOpen && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="username"
              value={loginData.username}
              onChange={handleChangeLogin}
              placeholder="Username"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChangeLogin}
              placeholder="Password"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
              Login
            </button>
          </form>
        )}

        {isRegisterOpen && (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="username"
              value={registerData.username}
              onChange={handleChangeRegister}
              placeholder="Username"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleChangeRegister}
              placeholder="Email"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              name="password"
              type="password"
              value={registerData.password}
              onChange={handleChangeRegister}
              placeholder="Password"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              name="password2"
              type="password"
              value={registerData.password2}
              onChange={handleChangeRegister}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
              Register
            </button>
          </form>
        )}

        <div className="text-center text-gray-400 text-sm mt-6">
          {isLoginOpen ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleMode} className="text-pink-500 hover:underline">
            {isLoginOpen ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
