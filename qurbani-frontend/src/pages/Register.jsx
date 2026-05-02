import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../context/firebase.init";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/register", form);

      toast.success(res.data.message);
      navigate("/login_user");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

const handleGoogleRegister = async (e) => {
  e.preventDefault(); // 🔥 important

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    // ✅ correct route
    await axios.post("http://localhost:5000/google_login", userData);

    // save session
    sessionStorage.setItem("email", user.email);

    // load user
    await loadUser(user.email);

    toast.success("Google login successful");
    navigate("/");

  } catch (err) {
    console.log(err);
    toast.error("Google login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow rounded w-96">

        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input name="name" placeholder="Name" className="w-full border p-2 mb-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full border p-2 mb-2" onChange={handleChange} />
        <input name="photo" placeholder="Photo URL" className="w-full border p-2 mb-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 mb-2" onChange={handleChange} />

        <button className="w-full bg-green-500 text-white p-2">
          Register
        </button>
        <br />
        <br />
         <button type="button" onClick={handleGoogleRegister} className="w-full bg-yellow-500 text-white p-2">
          Google Login
        </button>

        <p className="text-center mt-3 text-sm">
          Already have account? <Link to="/login_user">Login</Link>
        </p>

      </form>
    </div>
  );
}