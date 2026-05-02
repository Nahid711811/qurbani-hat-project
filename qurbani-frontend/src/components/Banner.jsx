import React from 'react'

export default function Banner() {
  return (
    <div className='flex justify-between gap-4 p-1 mt-10 bg-[#468432]'>
      <div className='flex flex-col justify-start items-start gap-6'>
        <div className='p-3 rounded-3xl bg-[#FFA02E]'>
            <p className='text-center text-2xl'>QurbaniHat Marketplace</p>
        </div>
        <p className='text-4xl text-white font-bold'>Premium Livestock Booking for Qurbani</p>
        <p className='text-xl'>Explore selected cows and goats with clear price, breed, weight, age and location before booking.</p>
      </div>
      <div>
        <img src="https://img.magnific.com/free-photo/cows-eating-lush-grass-green-field-front-fuji-mountain-japan_335224-36.jpg?semt=ais_hybrid&w=740&q=80" alt="cow image" />
      </div>
    </div>
  )
}
