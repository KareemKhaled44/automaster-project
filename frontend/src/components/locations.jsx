import React, {useState, useEffect} from 'react'
import api from '@/exports/Axios'
import { MapPin, Clock, Phone } from 'lucide-react'

const Locations = () => {
  const [locations, setLocations] = useState([])

  const getLocations = () => {
    api.get('api/locations/')
    .then(response => {
      setLocations(response.data)
    })
    .catch(error => {
      console.error("Error fetching locations:", error)
    })
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <div id="locations" className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Locations We <span className="text-[#22d3ee]">Serve</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Find our premium driving schools across major cities in Egypt
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {locations.map((location) => (
            <div 
              key={location.id}
              className="group bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#22d3ee] hover:shadow-xl hover:shadow-[#22d3ee]/10 hover:-translate-y-2"
            >
              {/* Location Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={location.image} 
                  alt={location.city} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#22d3ee] text-sm font-bold text-[#0f172a] px-3 py-1 rounded-full">
                  {location.city}
                </div>
              </div>
              
              {/* Location Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#22d3ee] mb-4">{location.city}</h3>
                
                {/* Address */}
                <div className="flex items-start mb-4">
                  
                  <p className="text-gray-300 text-sm">{location.area}</p>
                </div>
                
                {/* address */}
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-[#22d3ee] mr-3 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{location.address}</p>
                </div>
                
                
                {/* Action Button */}
                <button className="w-full px-4 py-2 bg-[#22d3ee] text-white font-medium rounded-lg hover:bg-[#1e40af] transition duration-300">
                  Book at this Location
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Locations