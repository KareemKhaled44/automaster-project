import React from 'react'
import { useParams } from 'react-router-dom'
import { 
  Star, MapPin, Phone, Mail, Globe, BookOpen, MessageCircle, 
  DollarSign, Venus, Users, Award, Calendar, Clock, Filter,
  ChevronRight, User, ThumbsUp, Share2, Heart, StarHalf
} from 'lucide-react'
import api from '../exports/Axios.jsx'

const AcademyDetails = () => {
  const { id } = useParams()
  const [academy, setAcademy] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState('courses')
  const [selectedTransmission, setSelectedTransmission] = React.useState('all')
  const [reviews, setReviews] = React.useState([])
  const [reviewsLoading, setReviewsLoading] = React.useState(false)

  const getAcademyDetails = () => {
    setLoading(true)
    api.get(`api/academies/${id}/`)
      .then(response => {
        setAcademy(response.data)
        console.log(response.data)
        // After getting academy details, fetch reviews
        fetchReviews()
      })
      .catch(error => {
        console.error("Error fetching academy details:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const fetchReviews = () => {
    setReviewsLoading(true)
    // In a real app, you would fetch from API
    // api.get(`api/academies/${id}/reviews/`)
    //   .then(response => setReviews(response.data))
    //   .catch(error => console.error("Error fetching reviews:", error))
    //   .finally(() => setReviewsLoading(false))
    
    // Mock data for now
    setTimeout(() => {
      const mockReviews = [
        {
          id: 1,
          user_name: "Ahmed Mohamed",
          rating: 5,
          date: "2026-03-01",
          text: "Excellent academy! The instructors are very professional and patient. I passed my driving test on the first try.",
          user_image: null,
          helpful_count: 12
        },
        {
          id: 2,
          user_name: "Sarah Khaled",
          rating: 4,
          date: "2026-02-15",
          text: "Good experience overall. The courses are well-structured and the prices are reasonable. Would recommend.",
          user_image: null,
          helpful_count: 8
        },
        {
          id: 3,
          user_name: "Omar Hassan",
          rating: 5,
          date: "2026-02-10",
          text: "Best driving academy in Cairo! The trainers are experienced and the cars are well-maintained.",
          user_image: null,
          helpful_count: 15
        },
        {
          id: 4,
          user_name: "Nour El-Din",
          rating: 3,
          date: "2026-01-28",
          text: "Decent academy but sometimes scheduling can be difficult. The training quality is good though.",
          user_image: null,
          helpful_count: 4
        },
        {
          id: 5,
          user_name: "Mariam Adel",
          rating: 5,
          date: "2026-01-15",
          text: "Very satisfied with my experience. The female trainer option was perfect for me. Highly recommended!",
          user_image: null,
          helpful_count: 21
        }
      ]
      setReviews(mockReviews)
      setReviewsLoading(false)
    }, 1000)
  }

  React.useEffect(() => {
    getAcademyDetails()
  }, [id])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="h-4 w-4 text-yellow-400 fill-current" />)
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-600" />)
      }
    }
    return stars
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#22d3ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading academy details...</p>
        </div>
      </div>
    )
  }

  if (!academy) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Academy not found</p>
          <a href="/" className="text-[#22d3ee] hover:underline mt-4 inline-block">Go back home</a>
        </div>
      </div>
    )
  }

  // Filter courses by transmission
  const filteredCourses = selectedTransmission === 'all' 
    ? academy.courses 
    : academy.courses.filter(course => course.transmission === selectedTransmission)

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Logo */}
            <div className="w-48 h-48 md:w-56 md:h-56 bg-[#1e293b] rounded-2xl border-2 border-gray-700 overflow-hidden shadow-2xl">
              <img 
                src={academy.logo} 
                alt={academy.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Academy Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Badges */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                {academy.has_female_trainer && (
                  <div className="flex items-center gap-1 bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-full border border-pink-400/30">
                    <Venus className="h-4 w-4" />
                    <span className="text-sm font-medium">Female Trainers Available</span>
                  </div>
                )}
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-400/30">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-white font-bold">{academy.avg_rating ? Number(academy.avg_rating).toFixed(1) : 'New'}</span>
                  <span className="text-gray-300">({academy.reviews_count} reviews)</span>
                </div>
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {academy.name}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-300 justify-center md:justify-start mb-6">
                <MapPin className="h-5 w-5 text-[#22d3ee]" />
                <span>{academy.location.join(' • ')}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto md:mx-0">
                <div className="bg-[#1e293b] rounded-lg p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-[#22d3ee]">{academy.courses_count}</div>
                  <div className="text-xs text-gray-400">Total Courses</div>
                </div>
                <div className="bg-[#1e293b] rounded-lg p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-[#22d3ee]">{academy.trainers_count}</div>
                  <div className="text-xs text-gray-400">Trainers</div>
                </div>
                <div className="bg-[#1e293b] rounded-lg p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-[#22d3ee]">{academy.location.length}</div>
                  <div className="text-xs text-gray-400">Branches</div>
                </div>
                <div className="bg-[#1e293b] rounded-lg p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-[#22d3ee]">{academy.minimum_price}</div>
                  <div className="text-xs text-gray-400">Starting From</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-1 py-4">
            {['courses', 'trainers', 'reviews', 'info', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium capitalize whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#22d3ee] text-[#0f172a]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'info' ? 'About' : tab}
                {tab === 'reviews' && (
                  <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                    {academy.reviews_count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Courses Section */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Available <span className="text-[#22d3ee]">Courses</span>
              </h2>
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-gray-400" />
                <select 
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="bg-[#1e293b] border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#22d3ee]"
                >
                  <option value="all">All Transmissions</option>
                  <option value="manual">Manual</option>
                  <option value="auto">Automatic</option>
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden hover:border-[#22d3ee] transition-all duration-300 group"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Transmission Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#22d3ee]/30">
                      <span className="text-white text-xs font-medium uppercase">
                        {course.transmission === 'auto' ? 'Automatic' : 'Manual'}
                      </span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4 bg-[#22d3ee] text-[#0f172a] px-3 py-1.5 rounded-full font-bold">
                      {course.price} EGP
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="h-4 w-4 text-[#22d3ee]" />
                        <span className="text-sm">Duration: {course.duration} hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-4 w-4 text-[#22d3ee]" />
                        <span className="text-sm">Trainer: {course.trainers.map(t => t.name).join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <BookOpen className="h-4 w-4 text-[#22d3ee]" />
                        <span className="text-sm">Sessions: {course.sessions}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <button className="w-full px-4 py-2 bg-transparent border border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee] hover:text-white rounded-lg transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No courses found for selected filter</p>
              </div>
            )}
          </div>
        )}

        {/* Trainers Section */}
        {activeTab === 'trainers' && (
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Our Expert <span className="text-[#22d3ee]">Trainers</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academy.trainers.map((trainer) => (
                <div 
                  key={trainer.id}
                  className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden hover:border-[#22d3ee] transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#22d3ee] to-[#1e40af]">
                        {trainer.image ? (
                          <img 
                            src={trainer.image} 
                            alt={trainer.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                        <p className="text-sm text-gray-400">{trainer.car_model}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">
                      {trainer.bio || "Experienced driving instructor"}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Award className="h-4 w-4 text-[#22d3ee]" />
                        <span>{trainer.experience_years} years experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 text-[#22d3ee]" />
                        <span>{trainer.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 text-[#22d3ee]" />
                        <span>{trainer.availability}</span>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-transparent border border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee] hover:text-white rounded-lg transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Reviews Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Student <span className="text-[#22d3ee]">Reviews</span>
              </h2>
            </div>

            {reviewsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#22d3ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading reviews...</p>
              </div>
            ) : (
              <>
                {/* Reviews Summary - Only average rating */}
                {reviews.length > 0 && (
                  <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-[#22d3ee]">
                          {academy.avg_rating ? Number(academy.avg_rating).toFixed(1) : '0.0'}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">{academy.reviews_count} total reviews</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(academy.avg_rating || 0)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div 
                      key={review.id}
                      className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 hover:border-[#22d3ee] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#22d3ee] to-[#1e40af] flex items-center justify-center">
                            {review.user_image ? (
                              <img 
                                src={review.user_image} 
                                alt={review.user_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{review.user_name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-gray-400 text-xs">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-[#22d3ee] transition-colors group flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs">{review.helpful_count}</span>
                        </button>
                      </div>
                      <p className="text-gray-300">{review.text}</p>
                    </div>
                  ))}
                </div>

                {reviews.length === 0 && (
                  <div className="text-center py-12 bg-[#1e293b] border border-gray-700 rounded-xl">
                    <Star className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Reviews Yet</h3>
                    <p className="text-gray-400">Be the first to share your experience with this academy</p>
                  </div>
                )}

                {/* Load More Button */}
                {reviews.length >= 5 && (
                  <div className="text-center">
                    <button className="px-8 py-3 border-2 border-[#22d3ee] text-white font-semibold rounded-full hover:bg-[#22d3ee] hover:text-[#0f172a] transition-all duration-300">
                      Load More Reviews
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Info Section */}
        {activeTab === 'info' && (
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              About <span className="text-[#22d3ee]">{academy.name}</span>
            </h2>

            <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8">
              <p className="text-gray-300 leading-relaxed mb-8">
                {academy.description || "No description available"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#22d3ee]" />
                    Features & Benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-300">
                      <ChevronRight className="h-4 w-4 text-[#22d3ee]" />
                      Professional certified instructors
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <ChevronRight className="h-4 w-4 text-[#22d3ee]" />
                      Modern training vehicles
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <ChevronRight className="h-4 w-4 text-[#22d3ee]" />
                      Flexible scheduling
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <ChevronRight className="h-4 w-4 text-[#22d3ee]" />
                      {academy.courses_count} different courses available
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#22d3ee]" />
                    Quick Stats
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-gray-300">
                      <span>Total Courses</span>
                      <span className="text-[#22d3ee] font-bold">{academy.courses_count}</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Total Trainers</span>
                      <span className="text-[#22d3ee] font-bold">{academy.trainers_count}</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Branches</span>
                      <span className="text-[#22d3ee] font-bold">{academy.location.length}</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Average Rating</span>
                      <span className="text-[#22d3ee] font-bold">{academy.avg_rating} / 5</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Total Reviews</span>
                      <span className="text-[#22d3ee] font-bold">{academy.reviews_count}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Contact <span className="text-[#22d3ee]">Information</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8">
                <div className="space-y-6">
                  {/* Phones */}
                  {academy.contactInfo.phones.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-[#22d3ee]" />
                        Phone Numbers
                      </h3>
                      <div className="space-y-2">
                        {academy.contactInfo.phones.map((phone, idx) => (
                          <a 
                            key={idx}
                            href={`tel:${phone}`}
                            className="block text-[#22d3ee] hover:underline"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Emails */}
                  {academy.contactInfo.emails.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-[#22d3ee]" />
                        Email Addresses
                      </h3>
                      <div className="space-y-2">
                        {academy.contactInfo.emails.map((email, idx) => (
                          <a 
                            key={idx}
                            href={`mailto:${email}`}
                            className="block text-[#22d3ee] hover:underline"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Websites */}
                  {academy.contactInfo.websites.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-[#22d3ee]" />
                        Website
                      </h3>
                      <a 
                        href={academy.contactInfo.websites[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#22d3ee] hover:underline"
                      >
                        {academy.contactInfo.websites[0]}
                      </a>
                    </div>
                  )}

                  {/* Addresses */}
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#22d3ee]" />
                      Branches
                    </h3>
                    <div className="space-y-3">
                      {academy.location.map((loc, idx) => (
                        <p key={idx} className="text-gray-300">
                          {loc}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8">
                <h3 className="text-white font-semibold mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#22d3ee]"
                  />
                  <input 
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#22d3ee]"
                  />
                  <textarea 
                    placeholder="Your Message"
                    rows="4"
                    className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#22d3ee]"
                  ></textarea>
                  <button className="w-full px-6 py-3 bg-[#22d3ee] hover:bg-[#1e40af] text-white font-semibold rounded-lg transition-all duration-300">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="p-3 bg-[#22d3ee] text-[#0f172a] rounded-full shadow-lg hover:bg-[#1e40af] hover:text-white transition-all duration-300 group">
          <Share2 className="h-5 w-5" />
        </button>
        <button className="p-3 bg-[#1e293b] text-white rounded-full shadow-lg border border-gray-700 hover:border-[#22d3ee] transition-all duration-300 group">
          <Heart className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default AcademyDetails
