import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setUser, loadUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/login", form);

    sessionStorage.setItem("email", res.data.user.email);

    await loadUser(res.data.user.email); // 🔥 important

    toast.success("Login successful");
    navigate("/");

  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 w-96 shadow bg-white">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 mb-2"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 mb-2"
        />

        <button className="w-full bg-blue-500 text-white p-2">
          Login
        </button>

        <p className="text-center mt-2">
          No account? <Link to="/register_user">Register</Link>
        </p>

      </form>
    </div>
  );
}