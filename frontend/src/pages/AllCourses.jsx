import React, { useState, useEffect } from 'react'
import { Course1, Course2, Course3 } from '../exports/index.js'
import api from '@/exports/Axios.jsx';
import { Clock, User, Star, ChevronDown, Search } from 'lucide-react'
import {Header} from '../exports/index.js';


const AllCourses = () => {
  const [courses , setCourses] = useState([])

  const getCourses = async () => {
    api.get('api/courses/')
    .then(response => {
      setCourses(response.data)
    })
    .catch(error => {
      console.error('Error fetching courses:', error)
    })
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <div className='w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]'>
      <div className="max-w-7xl mx-auto">
        <div className="absolute inset-0 z-0">
          <Header />
        </div>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight'>
            Explore Our <span className='text-[#22d3ee]'>Courses</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive driving programs tailored to all skill levels and needs
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
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
            />
          </div>
        </div>

        {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="group bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#22d3ee] hover:shadow-xl hover:shadow-[#22d3ee]/10 hover:-translate-y-2"
              >
                {/* Course Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Course Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[#22d3ee]">{course.title}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="mr-1 h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  
                  {/* Course Details */}
                  <div className="flex flex-wrap gap-4 mb-5">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="mr-2 h-4 w-4 text-[#22d3ee]" />
                      <span>{course.sessions} sessions</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <User className="mr-2 h-4 w-4 text-[#22d3ee]" />
                      <span>{course.duration} minutes</span>
                    </div>
                  </div>
                  
                  {/* Price & Button */}
                  <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <div>
                      <span className="text-gray-400 text-sm">Starting from</span>
                      <p className="text-2xl font-bold text-white">${course.price}</p>
                    </div>
                    <button className="px-5 py-2 bg-[#22d3ee] text-white font-medium rounded-full hover:bg-[#1e40af] transition-all duration-300 hover:shadow-md hover:shadow-[#22d3ee]/30">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default AllCourses