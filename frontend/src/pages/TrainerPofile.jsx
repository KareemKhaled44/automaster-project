import React, {useState, useEffect} from 'react'
import { Header } from '@/exports'
import { MapPin, Phone, Mail, Star, Clock, Award, Car, Calendar, Shield, Users } from 'lucide-react'
import api from '@/exports/Axios'
import { useParams } from 'react-router-dom';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState({})
  const { id } = useParams(); // Get trainer ID from URL params

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await api.get(`api/trainer-profile/${id}/`) // Fetch trainer data
        setTrainer(response.data)
      } catch (error) {
        console.error('Error fetching trainer data:', error)
      }
    }

    fetchTrainer()
  }, [id])

  return (
      
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <Header />
      </div>
      <div className="max-w-6xl mx-auto pt-20">
        {trainer && (
          <React.Fragment>
            <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8"> 
                {/* Trainer Image */}
                <div className="flex-shrink-0">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#22d3ee] shadow-lg"
                  />
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{trainer.name}</h1>
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <Car className="h-5 w-5 text-[#22d3ee] mr-2" />
                    <span className="text-xl text-[#22d3ee] font-semibold">{trainer.car_model}</span>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-5 w-5 fill-current mr-1" />
                      <span className="text-lg font-semibold">5</span>
                    </div>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-300">{trainer.experience_years} Years Experience</span>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <MapPin className="h-5 w-5 text-[#22d3ee] mr-2" />
                    <span className="text-gray-300">{trainer.location}</span>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start">
                    <Phone className="h-5 w-5 text-[#22d3ee] mr-2" />
                    <span className="text-gray-300">{trainer.phone}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="px-6 py-3 bg-[#22d3ee] text-white font-semibold rounded-lg hover:bg-[#1e40af] transition">
                    Book Session
                  </button>
                  <button className="px-6 py-3 border border-[#22d3ee] text-[#22d3ee] font-semibold rounded-lg hover:bg-[#22d3ee] hover:text-white transition">
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Bio Section */}
                <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#22d3ee] mb-4">About Me</h2>
                  <p className="text-gray-300 leading-relaxed">{trainer.bio}</p>
                </div>

                {/* Car Model */}
                <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#22d3ee] mb-4">Training Vehicle</h2>
                  <div className="flex items-center">
                    <Car className="h-8 w-8 text-[#22d3ee] mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{trainer.car_model}</h3>
                      <p className="text-gray-400">Fully equipped with dual controls for safety</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Certifications */}
                {/* <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#22d3ee] mb-4">Certifications</h2>
                  <ul className="space-y-2">
                    {trainer.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <Shield className="h-4 w-4 text-[#22d3ee] mr-3" />
                        <span className="text-gray-300">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div> */}

                {/* Availability */}
                <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#22d3ee] mb-4">Availability</h2>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-[#22d3ee] mr-3" />
                    <span className="text-gray-300">{trainer.availability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-[#22d3ee] text-white font-bold rounded-lg hover:bg-[#1e40af] transition text-lg">
                Book Your First Lesson with {trainer.name}
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default TrainerProfile