import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const [form, setForm] = useState({
    name: "",
    photo: "",
  });

  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/user/${email}`);
      setForm({
        name: res.data.name,
        photo: res.data.photo,
      });
    };

    fetchUser();
  }, [email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/user/${email}`, form);

      toast.success("Profile updated successfully");
      navigate("/my_profile");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Update Profile</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Name"
        />

        <input
          name="photo"
          value={form.photo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Photo URL"
        />

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Update Information
        </button>
      </form>

    </div>
  );
}