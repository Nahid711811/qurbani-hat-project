// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AuthContext } from "../context/AuthContext";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../context/firebase.init";
// import Lottie from "react-lottie-player"
// import animationData from "../../public/Login.json"

// export default function Login() {
//   const { setUser, loadUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post("http://localhost:5000/login", form);

//     sessionStorage.setItem("email", res.data.user.email);

//     await loadUser(res.data.user.email); // 🔥 important

//     toast.success("Login successful");
//     navigate("/");

//   } catch (err) {
//     toast.error(err.response?.data?.message || "Login failed");
//   }
// };

// const handleGoogleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     const userData = {
//       name: user.displayName,
//       email: user.email,
//       photo: user.photoURL,
//     };

//     // ✅ FIXED route
//     await axios.post("http://localhost:5000/google_login", userData);

//     // save session
//     sessionStorage.setItem("email", user.email);

//     // load user
//     await loadUser(user.email);

//     toast.success("Google login successful");
//     navigate("/");

//   } catch (err) {
//     console.log(err);
//     toast.error("Google login failed");
//   }
// };

//   return (
//     <>
//     <div className="lg:flex-row md:flex-row flex justify-center items-center flex-col gap-4">

//       <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleLogin} className="p-6 w-96 shadow bg-white">

//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <input
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full border p-2 mb-2"
//         />

//         <input
//           name="password"
//           type="password"
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full border p-2 mb-2"
//         />

//         <button className="w-full bg-blue-500 text-white p-2">
//           Login
//         </button>
//         <br />
//         <br />
//          <button type="button" onClick={handleGoogleLogin} className="w-full bg-yellow-500 text-white p-2">
//           Google Login
//         </button>

//         <p className="text-center mt-2">
//           No account? <Link to="/register_user">Register</Link>
//         </p>

//       </form>
//     </div>

//     <div className="lg:w-1/2 md:w-1/2 w-full">
//         <Lottie
//           loop
//           animationData={animationData}
//           play
//           style={{ width: "100%", height: "100%" }}
//         />
//       </div>
//     </div>
//     </>
//   );
// }import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../context/firebase.init";
import Lottie from "react-lottie-player";
import animationData from "../../public/Login.json";
import { useContext, useState } from "react";

export default function Login() {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", form);

      sessionStorage.setItem("email", res.data.user.email);
      await loadUser(res.data.user.email);

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      await axios.post("http://localhost:5000/google_login", userData);

      sessionStorage.setItem("email", user.email);
      await loadUser(user.email);

      toast.success("Google login successful");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 gap-10">

      {/* Form Card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg transition"
          >
            Google Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          No account?{" "}
          <Link to="/register_user" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>

    </div>
  );
}