import React from 'react'
import { Star, MapPin, Phone, Mail, Globe, BookOpen, MessageCircle, DollarSign ,Venus } from 'lucide-react'
import api from '../exports/Axios.jsx'

const PopularAcademies = () => {
  const [academies, setAcademies] = React.useState([])

  const getAcademies = () => {
    api.get('api/home-academies/')
      .then(response => {
        setAcademies(response.data.results)
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching academies:", error)
      })
  }

  React.useEffect(() => {
    getAcademies()
  }, [])

  return (
    <div id="academies" className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 ">
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
                className="group bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#22d3ee] hover:shadow-xl hover:shadow-[#22d3ee]/10 hover:-translate-y-2 relative"
              >
                {/* ...existing code... */}
                {/* Academy Logo/Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={academy.logo} 
                    alt={academy.name} 
                    className="w-full h-full object-contain bg-[#0f172a] p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  {/* Female Trainers Available Badge - Positioned top left */}
                  {academy.has_female_trainer && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-pink-400 px-3 py-1.5 rounded-full border border-pink-400/30">
                      <Venus className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">Female Trainers</span>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-400/30">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-white font-bold text-sm">   {academy.avg_rating ? Number(academy.avg_rating).toFixed(1) : 'New'}</span>
                    <span className="text-gray-300 text-xs">({academy.reviews_count})</span>
                  </div>
                  
                  {/* Academy Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{academy.name}</h3>
                    <div className="flex items-center text-gray-200 text-sm">
                      <MapPin className="h-4 w-4 text-[#22d3ee] mr-1 drop-shadow" />
                      <span className="drop-shadow-md">{academy.location.join(' • ')}</span>
                    </div>
                  </div>
                </div>
                
                {/* Academy Content */}
                <div className="p-6 space-y-4">
                  {/* ...existing code... */}
                  {/* Description */}
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {academy.description || "No description available"}
                  </p>
                  
                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-[#22d3ee] mt-0.5 flex-shrink-0" />
                    <a 
                      href={academy.google_maps_url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#22d3ee] text-xs hover:underline truncate"
                    >
                      {academy.address_text}
                    </a>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-700">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#22d3ee]">{academy.courses_count}</div>
                      <div className="text-xs text-gray-400">Courses</div>
                    </div>
                    <div className="text-center border-x border-gray-700">
                      <div className="text-xl font-bold text-[#22d3ee]">
                        {academy.trainers_count}
                      </div>
                      <div className="text-xs text-gray-400">Trainers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#22d3ee]">
                        {academy.location.length}
                      </div>
                      <div className="text-xs text-gray-400">Branches</div>
                    </div>
                  </div>
                  
                  {/* Price Section */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#0f172a] to-[#1a2741] rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#22d3ee]/10 rounded-lg">
                        <DollarSign className="h-4 w-4 text-[#22d3ee]" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block">Starting from</span>
                        <span className="text-lg font-bold text-white">{academy.minimum_price} <span className="text-sm font-normal text-gray-400">EGP</span></span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                      per course
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-2">
                    {/* Phones */}
                    {academy.contactInfo.phones.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#22d3ee] flex-shrink-0" />
                        <div className="flex flex-wrap gap-2">
                          {academy.contactInfo.phones.slice(0, 2).map((phone, idx) => (
                            <span key={idx} className="text-gray-300 text-xs bg-gray-800 px-2 py-1 rounded">
                              {phone}
                            </span>
                          ))}
                          {academy.contactInfo.phones.length > 2 && (
                            <span className="text-gray-400 text-xs">+{academy.contactInfo.phones.length - 2}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Emails */}
                    {academy.contactInfo.emails.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#22d3ee] flex-shrink-0" />
                        <span className="text-gray-300 text-xs truncate">
                          {academy.contactInfo.emails[0]}
                        </span>
                      </div>
                    )}
                    
                    {/* Website */}
                    {academy.contactInfo.websites.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#22d3ee] flex-shrink-0" />
                        <a 
                          href={academy.contactInfo.websites[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#22d3ee] text-xs hover:underline truncate"
                        >
                          {academy.contactInfo.websites[0].replace('https://', '').replace('http://', '')}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <a href={`/academy-details/${academy.id}`} className="flex-1 px-4 py-2.5 bg-[#22d3ee] hover:bg-[#1e40af] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      View Courses
                    </a>
                    <button className="px-4 py-2.5 bg-transparent border border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee] hover:text-white rounded-lg transition-all duration-300">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a href="/all-academies" className="px-8 py-3 border-2 border-[#22d3ee] text-white font-semibold rounded-full hover:bg-[#22d3ee] hover:text-[#0f172a] transition-all duration-300">
            View All Academies
          </a>
        </div>
      </div>
    </div>
  )
}

export default PopularAcademies