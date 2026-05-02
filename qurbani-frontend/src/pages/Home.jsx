import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'

export default function Home() {
     const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Banner />
      <br />
      <br />
      <br />

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {animals.map((animal) => (
    <div
      key={animal.id}
      className="border p-4 rounded-lg shadow flex flex-col gap-2"
    >
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="text-lg font-bold">{animal.name}</h3>
      <p>Price: {animal.price}</p>
      <p>Type: {animal.type}</p>
      <p>Breed: {animal.breed}</p>
      <p>Weight: {animal.weight} kg</p>
      <p>Age: {animal.age} years</p>
    </div>
  ))}
</div>
    </div>
  )
}
