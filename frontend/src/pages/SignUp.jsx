import {React, useState} from 'react'
import { Lock, User, Mail, Phone, Car } from 'lucide-react'
import { Link } from 'react-router-dom'
import {Header} from '../exports/index.js';
import api from "../exports/Axios.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register/", {
        username,
        email,
        password,
        confirmPassword
      });

      navigate("/signin", { state: { successMessage: "User created successfully!" } });
      
    } catch (err) {
      console.error(err.response?.data);
      if (err.response) {
        const errorData = err.response.data;
        toast.error(errorData.error);
      } else {
        toast.error("Server error, check backend logs!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 z-0">
       <Header />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mx-2">
            Create Your <span className="text-[#22d3ee]">Account</span>
          </h1>
          <p className="text-gray-300">
            Join Auto Master and begin your driving journey today
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8 shadow-lg shadow-black/30">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#22d3ee]" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                  placeholder="Username"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#22d3ee]" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#22d3ee]" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#22d3ee]" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-[#0f172a] border-gray-700 rounded focus:ring-[#22d3ee] text-[#22d3ee]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-300">
                  I agree to the <a href="#" className="text-[#22d3ee] hover:underline">Terms of Service</a> and <a href="#" className="text-[#22d3ee] hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#22d3ee] hover:bg-[#1e40af] text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-[#22d3ee]/30 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#22d3ee] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp