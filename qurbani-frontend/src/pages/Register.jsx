import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../context/firebase.init";
import { AuthContext } from "../context/AuthContext";
import Lottie from "react-lottie-player";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/register.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.photo || !form.password) {
    toast.error("All fields are required");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/register", form);

    toast.success(res.data.message);
    navigate("/login_user");
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
  }
};

  const handleGoogleRegister = async (e) => {
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
    <div className="pt-5 md:pt-0 min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4 gap-10">

      <ToastContainer position="top-center" autoClose={3000} />

      {/* FORM */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Create Account 🚀
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          <input
            name="photo"
            placeholder="Photo URL"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition">
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg transition"
          >
            Google Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login_user" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* ANIMATION */}
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