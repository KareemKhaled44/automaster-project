import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Course1, Course2, Course3 } from "../exports";
import { Link} from "react-router-dom";
const academies = [
  {
    id: 1,
    name: "Cairo Driving Excellence",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 245,
    governorate: "Cairo",
    location: "Downtown Cairo",
  },
  {
    id: 2,
    name: "Alexandria Coast Academy",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 187,
    governorate: "Alexandria",
    location: "Alexandria Seafront",
  },
  {
    id: 3,
    name: "Giza Pyramid Driving School",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 156,
    governorate: "Giza",
    location: "Giza Plateau",
  },
];

const coursesData = [
  {
    id: 1,
    title: "Beginner Driving Course",
    academyId: 1,
    academy: "Cairo Driving Excellence",
    level: "Beginner",
    drivingType: "Automatic",
    totalSessions: 6,
    sessionPrice: 30,
    rating: 4.8,
    image: Course1,
    description: "Learn the basics of driving with certified instructors.",
  },
  {
    id: 2,
    title: "Advanced Driving Techniques",
    academyId: 2,
    academy: "Alexandria Coast Academy",
    level: "Advanced",
    drivingType: "Manual",
    totalSessions: 8,
    sessionPrice: 45,
    rating: 4.7,
    image: Course2,
    description: "Master advanced driving skills for city and highway driving.",
  },
  {
    id: 3,
    title: "Defensive Driving Course",
    academyId: 3,
    academy: "Giza Pyramid Driving School",
    level: "Intermediate",
    drivingType: "Automatic",
    totalSessions: 4,
    sessionPrice: 40,
    rating: 4.6,
    image: Course3,
    description: "Enhance safety with defensive driving strategies.",
  },
];

const AcademyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const academy = academies.find((a) => a.id === Number(id));

  if (!academy) {
    return (
      <div className="text-center text-gray-400 mt-24">
        Academy not found.
      </div>
    );
  }

  const academyCourses = coursesData.filter(
    (course) => course.academyId === academy.id
  );

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a]/80 to-[#0f172a]/90 min-h-screen text-white">

      {/* HERO */}
      <div className="relative h-[360px] w-full overflow-hidden">
        <img
          src={academy.image}
          alt={academy.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            {academy.name}
          </h1>

          <div className="flex items-center gap-3 mt-3 text-gray-200">
            <Star className="text-yellow-400" />
            <span>{academy.rating} Rating</span>
            <span>({academy.reviews} Reviews)</span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-300">
            <MapPin className="h-4 w-4" />
            <span>{academy.governorate} — {academy.location}</span>
          </div>
        </div>
      </div>

      {/* COURSES */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Courses Offered
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {academyCourses.length > 0 ? (
            academyCourses.map((course) => {
              const totalPrice =
                course.totalSessions * course.sessionPrice;

              return (
                <div
                  key={course.id}
                  className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 hover:border-[#22d3ee] transition"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-40 w-full object-cover rounded-lg mb-4"
                  />

                  <h3 className="text-lg font-bold">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {course.description}
                  </p>

                  <p className="text-gray-400 mt-2">
                    Level: {course.level}
                  </p>

                  <p className="text-[#22d3ee] font-semibold mt-2">
                    Total Price: ${totalPrice}
                  </p>

                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-4 block text-center py-2 bg-[#22d3ee] text-[#0f172a] rounded-lg hover:bg-[#1e40af] font-semibold"
                  >
                    View Course
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No courses available for this academy
            </p>
          )}

        </div>
      </div>

    </div>
  );
};

export default AcademyDetails;
