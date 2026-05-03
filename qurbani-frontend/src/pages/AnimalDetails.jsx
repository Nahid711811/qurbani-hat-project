import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id.toString() === id);
        setAnimal(found);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    toast.success("Booking successful!");
    navigate("/");

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  if (!animal) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 border border-[#468432] rounded-md my-1">
      <img src={animal.image} className="w-full h-64 object-cover rounded" />

      <h2 className="text-2xl font-bold mt-4">{animal.name}</h2>
      <p>Type: {animal.type}</p>
      <p>Breed: {animal.breed}</p>
      <p>Weight: {animal.weight} kg</p>
      <p>Age: {animal.age} years</p>
      <p>Location: {animal.location}</p>
      <p className="text-xl text-[#FFA02E] font-bold">৳{animal.price}</p>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="mt-6 space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />

        <button className="bg-green-500 text-white p-2 rounded w-full">
          Book Now
        </button>
      </form>
    </div>
  );
}