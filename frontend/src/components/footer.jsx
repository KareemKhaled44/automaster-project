import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f172a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo and Description - Left */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-[#22d3ee]">AUTO</span>MASTER
            </h2>
            <p className="text-gray-400">
              Premium driving education with expert instructors and state-of-the-art training vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Center */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">Trainers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">Locations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#22d3ee] transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info - Right */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#22d3ee] mt-0.5 mr-3" />
                <span className="text-gray-400">123 Drive Street, Motor City, MC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#22d3ee] mr-3" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#22d3ee] mr-3" />
                <span className="text-gray-400">info@automaster.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Auto Master. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#22d3ee] text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#22d3ee] text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-[#22d3ee] text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer