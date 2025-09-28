import React, { useState, useEffect } from 'react'
import { Car, MapPin, Search, ChevronDown, Star } from 'lucide-react'
import api from '@/exports/Axios.jsx';
import { Trainer1, Trainer2, Trainer3, Trainer4} from '../exports/index.js'
import {Header} from '../exports/index.js';

const AllTrainers = () => {
    const [trainers, setTrainers] = useState([])

    const getTrainers = () => {
      api.get('api/trainers/')
        .then(response => {
          setTrainers(response.data)
        })
        .catch(error => {
          console.error("Error fetching trainers:", error)
        })
    }

    useEffect(() => {
      getTrainers()
    }, [])

  return (
    <div className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-[#1e3a8a]/80 to-[#0f172a]/90">
      <div className="max-w-7xl mx-auto">
        <div className="absolute inset-0 z-0">
          <Header />
        </div>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Our <span className="text-[#22d3ee]">Professional Trainers</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Learn from certified experts with years of experience
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#22d3ee]" />
            </div>
            <input
              type="text"
              placeholder="Search trainers..."
              className="w-full pl-10 pr-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
            />
          </div>
        </div>

        {/* Trainers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {trainers.map((trainer) => (
              <div 
                key={trainer.id}
                className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 text-center cursor-pointer 
                  transition-all duration-300 hover:border-[#22d3ee] hover:shadow-lg hover:shadow-[#22d3ee]/20 
                  hover:scale-[1.02] active:scale-95 flex flex-col items-center"
              >
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-[#22d3ee]"
                />
                <h3 className="text-white text-xl font-semibold mb-1">{trainer.name}</h3>
                
                <div className="flex items-center justify-center text-gray-300 text-base mb-1">
                  <Car className="mr-2 h-4 w-4 text-[#22d3ee]" />
                  <span>{trainer.car_model}</span>
                </div>
                
                <div className="flex items-center justify-center text-gray-400 text-sm mb-2">
                  <MapPin className="mr-2 h-4 w-4 text-[#22d3ee]" />
                  <span>{trainer.location}, Egypt</span>
                </div>
                
                <div className="flex items-center justify-center text-yellow-400 text-sm mb-3">
                  <span className="text-gray-400 ml-1">({trainer.experience_years} years of experience)</span>
                </div>
                
                <button className="mt-2 px-5 py-2 bg-[#22d3ee] text-white text-sm rounded-full 
                  hover:bg-[#1e40af] transition duration-200 w-full">
                  View Profile
                </button>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default AllTrainers