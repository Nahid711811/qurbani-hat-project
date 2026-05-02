import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import {Link} from "react-router-dom"

export default function Home() {
     const [animals, setAnimals] = useState([]);
     const aniCow = animals.slice(0, 6)

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Banner />

<div className='bg-white mt-20 p-2'>
    <div className='flex justify-between items-center gap-4 mb-4'>
      <p className='text-[#FFA02E] text-3xl font-bold'>Popular Collections</p>
      <Link
  to="/all_animals"
  className="py-2 px-4 rounded-2xl font-bold bg-[#468432] text-white"
>
  View All
</Link>
    </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">

  {aniCow?.map((animal) => (
    <div
      key={animal.id}
      className="border border-[#468432] p-4 rounded-lg shadow flex flex-col gap-2 text-md hover:shadow-lg"
    >
     <div>
       <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-40 object-cover rounded"
      />
     </div>
      <div className='flex justify-between gap-4 items-center'>
      <p className='text-sm text-white py-1 px-2 rounded-2xl bg-[#468432]'>{animal.type}</p>
      <p className='text-sm py-1 px-2 rounded-2xl bg-[#FFA02E]'>{animal.breed}</p>

      </div>
      <div>
      <h3 className="text-lg font-bold text-[#468432]">{animal.name}</h3>
      <p>Weight: {animal.weight} kg</p>
      <p>Age: {animal.age} years</p>
      <p>Location: {animal.location}</p>
      </div>
      <div className='flex justify-between gap-4 items-center'>
      <p className='font-bold text-[#FFA02E]'>৳{animal.price}</p>
      <button className='bg-[#468432] font-bold p-2 rounded-xl text-white hover:cursor-pointer'>Details</button>
      </div>
    </div>
  ))}
</div>
</div>
    </div>
  )
}
