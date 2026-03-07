import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "What are the requirements to enroll in driving courses?",
      answer: "You need to be at least 16 years old with a valid learner's permit. No prior driving experience is required for beginner courses."
    },
    {
      question: "How long does each driving course last?",
      answer: "Courses range from 2-week intensive programs to 8-week comprehensive courses, depending on the package you choose."
    },
    {
      question: "What vehicles will I learn to drive?",
      answer: "Our fleet includes modern sedans, SUVs, and manual transmission vehicles. Premium courses include luxury vehicle training."
    },
    {
      question: "Are your instructors certified?",
      answer: "Yes, all our instructors are state-licensed with minimum 5 years of professional driving instruction experience."
    },
    {
      question: "What's your cancellation policy?",
      answer: "You can cancel or reschedule up to 24 hours before your lesson without penalty. Late cancellations incur a 50% fee."
    }
  ]

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className='w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 '>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight'>
            Frequently Asked <span className='text-[#22d3ee]'>Questions</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Find answers to common queries about our driving courses and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                className={`w-full flex items-center justify-between p-6 text-left ${activeIndex === index ? 'bg-[#1e293b]' : 'bg-[#1e293b]/80'}`}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg md:text-xl font-medium text-white">
                  {faq.question}
                </h3>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#22d3ee]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#22d3ee]" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
              >
                <p className="text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Still have questions? Contact our support team
          </p>
          <a href="/contact-us" className="px-8 py-3 bg-[#22d3ee] text-white font-semibold rounded-full 
            hover:bg-[#1e40af] transition-all duration-300 hover:shadow-lg hover:shadow-[#22d3ee]/30">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQs
