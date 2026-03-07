import {React, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import api from '../exports/Axios.jsx'
import { Trainer1, Trainer2, Trainer3, Trainer4 } from '../exports/index.js'
const Trainers = () => {

  const [trainers, setTrainers] = useState([])

  const getTrainers = () => {
    api.get('api/home-trainers/')
    .then(response => {
      setTrainers(response.data.results)
    .catch(error =>{
      console.error("Error fetching trainers:", error)
    })
    })
  }

  useEffect(() => {
    getTrainers()
  }, [])

  return (
    <div className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      {/* Section Title */}
      <h2 className="flex justify-center w-full text-white font-bold text-3xl lg:text-4xl 2xl:text-5xl uppercase tracking-tight mb-8 md:mb-12">
        Our<span className="text-[#22d3ee] ml-2">Trainers</span>
      </h2>

      {/* Trainer cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 text-center cursor-pointer 
            transition-all duration-300 hover:border-[#22d3ee] hover:shadow-lg hover:shadow-[#22d3ee]/20 
            hover:scale-[1.02] active:scale-95 flex flex-col items-center">
            <img 
              src={trainer.image} 
              alt="Trainer" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4 object-cover border-2 border-[#22d3ee]"
            />
            <h3 className="text-white text-lg md:text-xl font-semibold mb-1">{trainer.name}</h3>
            <p className="text-gray-300 text-sm md:text-base mb-1">
              <FontAwesomeIcon icon={faCar} className="mr-2 text-[#22d3ee]" /> 
              {trainer.car_model}
            </p>
            <p className="text-gray-400 text-xs md:text-sm">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#22d3ee]" /> 
              {trainer.location}, Egypt
            </p>
            <div className="flex items-center justify-center text-yellow-400 text-sm mb-3">
                  <span className="text-gray-400 ml-1">({trainer.experience_years} years of experience)</span>
                </div>
            <a href={`/trainer-profile/${trainer.id}`} className="mt-4 px-4 py-2 bg-[#22d3ee] text-white text-xs md:text-sm rounded-full 
              hover:bg-[#1e40af] transition duration-200">
              View Profile
            </a>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <a href="/all-trainers" className="px-6 py-3 bg-transparent text-white font-semibold border-2 border-[#22d3ee] 
          rounded-full hover:bg-[#22d3ee] hover:text-[#0f172a] transition duration-300">
          View All Trainers
        </a>
      </div>
    </div>
  )
}

export default Trainers
