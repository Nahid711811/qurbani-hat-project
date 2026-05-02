import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
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

      toast.success(res.data.message);

      // ✅ DO NOT use localStorage (as you said)
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = () => {
    toast("Google login not implemented yet (optional)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded w-96">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-500 text-white p-2">
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full bg-red-500 text-white p-2 mt-2"
        >
          Google Login
        </button>

        <p className="text-center mt-3 text-sm">
          No account? <Link to="/register_user">Register</Link>
        </p>

      </form>
    </div>
  );
}