import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function AllAnimals() {
  const [animals, setAnimals] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const filteredAnimals = animals.filter((ani) =>
    filterType === "all" ? true : ani.type.toLowerCase() === filterType,
  );

  const sortedAnimals = [...filteredAnimals].sort((a, b) => {
    return sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price;
  });

  return (
    <div className="bg-white p-2">
      {/* HEADER + CONTROLS */}
      <div className="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div>
          <p className="text-[#FFA02E] text-lg">Livestock Collection</p>
          <p className="text-[#468432] text-3xl font-bold">All Animals</p>
        </div>

        <div className="flex gap-4 flex-wrap">
          {/* FILTER */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setFilterType("cow")}
              className={`px-2 py-1 rounded-lg border transition-all duration-200 ${
                filterType === "cow"
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Cow
            </button>

            <button
              onClick={() => setFilterType("goat")}
              className={`px-2 py-1 rounded-lg border transition-all duration-200 ${
                filterType === "goat"
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Goat
            </button>

            <button
              onClick={() => setFilterType("all")}
              className={`px-2 py-1 rounded-lg border transition-all duration-200 ${
                filterType === "all"
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              All
            </button>
          </div>

          {/* SORT */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder("lowToHigh")}
              className={`px-2 py-1 rounded-lg border ${
                sortOrder === "lowToHigh"
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Low → High
            </button>

            <button
              onClick={() => setSortOrder("highToLow")}
              className={`px-2 py-1 rounded-lg border ${
                sortOrder === "highToLow"
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              High → Low
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {sortedAnimals?.map((animal) => (
          <div
            key={animal.id}
            className="border border-[#468432] p-4 rounded-lg shadow flex flex-col gap-2 hover:shadow-lg"
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-40 object-cover rounded"
            />

            <div className="flex justify-between items-center">
              <p className="text-sm text-white py-1 px-2 rounded-2xl bg-[#468432]">
                {animal.type}
              </p>
              <p className="text-sm py-1 px-2 rounded-2xl bg-[#FFA02E]">
                {animal.breed}
              </p>
            </div>

            <h3 className="text-lg font-bold text-[#468432]">{animal.name}</h3>

            <p>Weight: {animal.weight} kg</p>
            <p>Age: {animal.age} years</p>
            <p>Location: {animal.location}</p>

            <div className="flex justify-between items-center">
              <p className="font-bold text-[#FFA02E]">৳{animal.price}</p>

              <button className="bg-[#468432] font-bold p-2 rounded-xl text-white">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
