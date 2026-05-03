import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../context/firebase.init";
import Lottie from "react-lottie-player";
import { useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Login.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://qubani-backend.vercel.app/login",
        form,
      );

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

      await axios.post(
        "https://qubani-backend.vercel.app/google_login",
        userData,
      );

      sessionStorage.setItem("email", user.email);
      await loadUser(user.email);

      toast.success("Google login successful");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "Use Google login") {
        toast.error("This account uses Google login");
      } else {
        toast.error(msg || "Login failed");
      }
    }
  };

  return (
    <div className="pt-5 md:pt-0 min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 gap-10">
      <ToastContainer position="top-center" autoClose={3000} />

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
