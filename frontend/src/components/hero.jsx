import React from 'react'
import { HeroImage } from '../exports/index.js'
const Hero = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Image on left (mobile: top) */}
        <div className="lg:w-1/2 w-full h-[500px] flex justify-center">
          <img 
            src={HeroImage} 
            alt="Luxury Car" 
            className="w-full max-w-md lg:max-w-lg  rounded-lg shadow-xl object-cover" 
          />
        </div>
        
        {/* Text content on right (mobile: bottom) */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight">
            Drive Your <span className="text-[#22d3ee]">Future</span> Today
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium">
            Explore top driving academies and courses across Egypt.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href='#courses' className="px-8 py-3 bg-[#22d3ee] text-white font-semibold rounded-full hover:bg-[#1e40af] transition duration-300 shadow-lg">
              Explore Courses
            </a>
            <button className="px-8 py-3 bg-transparent text-white font-semibold border-2 border-white rounded-full hover:bg-white hover:text-[#1e40af] transition duration-300">
              Join as an Academy
            </button>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Hero
