import React from 'react'
import { Send } from 'lucide-react'
import {Header} from '../exports/index.js';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="absolute inset-0 z-0">
          <Header />
        </div>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Contact <span className="text-[#22d3ee]">Auto Master</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get in touch with our team for inquiries, support, or to schedule your driving lessons
          </p>
        </div>

        {/* Contact Form */}
        <div className="flex justify-center">
          <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8 md:p-10 w-1/2">
          <h3 className="text-2xl font-bold text-[#22d3ee] mb-6">Send Us a Message</h3>
          
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                placeholder="+20 123 456 7890"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-[#22d3ee] text-white font-medium rounded-lg hover:bg-[#1e40af] transition duration-300 mt-2"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </form>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default ContactUs