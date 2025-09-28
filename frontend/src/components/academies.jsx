import React from 'react'
import { Star, MapPin, Users, Car, Award } from 'lucide-react'

const PopularAcademies = () => {
  const academies = [
    {
      id: 1,
      name: "Cairo Driving Excellence",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 245,
      location: "Downtown Cairo",
      students: "1.2k+",
      courses: 8,
      featured: ["Mercedes", "BMW", "Defensive Driving"]
    },
    {
      id: 2,
      name: "Alexandria Coast Academy",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 187,
      location: "Alexandria Seafront",
      students: "950+",
      courses: 6,
      featured: ["Honda", "Toyota", "Coastal Driving"]
    },
    {
      id: 3,
      name: "Giza Pyramid Driving School",
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 156,
      location: "Giza Plateau",
      students: "800+",
      courses: 7,
      featured: ["Luxury Vehicles", "Off-Road", "Advanced Techniques"]
    }
  ]

  return (
    <div id="academies" className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e3a8a]/80 to-[#0f172a]/90">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Popular <span className="text-[#22d3ee]">Academies</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Discover top-rated driving schools trusted by thousands of students across Egypt
          </p>
        </div>

        {/* Academies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {academies.map((academy) => (
            <div 
              key={academy.id}
              className="group bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#22d3ee] hover:shadow-xl hover:shadow-[#22d3ee]/10 hover:-translate-y-2"
            >
              {/* Academy Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={academy.image} 
                  alt={academy.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#22d3ee] text-sm font-bold text-[#0f172a] px-3 py-1 rounded-full">
                  Featured
                </div>
              </div>
              
              {/* Academy Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{academy.name}</h3>
                
                {/* Rating and Reviews */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span className="text-sm font-semibold">{academy.rating}</span>
                  </div>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-gray-400 text-sm">({academy.reviews} reviews)</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-[#22d3ee] mr-2" />
                  <span className="text-gray-300 text-sm">{academy.location}</span>
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="h-4 w-4 text-[#22d3ee] mr-2" />
                    <span>{academy.students}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Car className="h-4 w-4 text-[#22d3ee] mr-2" />
                    <span>{academy.courses} courses</span>
                  </div>
                </div>
                
                {/* Featured Courses */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm font-medium mb-2">Featured Courses:</p>
                  <div className="flex flex-wrap gap-2">
                    {academy.featured.map((item, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-[#22d3ee]/10 text-[#22d3ee] text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Button */}
                <button className="w-full px-4 py-3 bg-[#22d3ee] text-white font-medium rounded-lg hover:bg-[#1e40af] transition duration-300 flex items-center justify-center">
                  <Award className="h-4 w-4 mr-2" />
                  View Academy
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-[#22d3ee] text-white font-semibold rounded-full hover:bg-[#22d3ee] hover:text-[#0f172a] transition-all duration-300">
            View All Academies
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopularAcademies