import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://qubani-backend.vercel.app/user/${email}`);
      setUser(res.data);
    };

    fetchUser();
  }, [email]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

        <img
          src={user.photo}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        <button
          onClick={() => navigate("/update_profile")}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}