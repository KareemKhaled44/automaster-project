import { AlignRight, LogIn, LogOut, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from 'react'
import api from '@/exports/Axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navItems = ['Home', 'Academies', 'Courses', 'Trainers']

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      await api.post("/auth/logout/", { refresh });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/signin", { state: { successMessage: "You have logged out successfully!" } });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage, { toastId: "successMessage" });

      // delete successMessage from state
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);

  return (
    <header className='flex justify-between bg-[#0f172a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/80 items-center 
      px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 h-16 md:h-20 shadow-md shadow-black/20'>
      
      {/* Logo */}
      <a href="/" className="flex-shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-white">
        LEARN  <span className="text-[#22d3ee]">2</span> DRIVE
        </h1>
      </a>

      {/* Search Bar - Hidden on mobile, shown on medium+ */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, trainers..."
            className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] text-sm"
          />
        </div>
      </div>

      {/* Navigation - Hidden on small screens, shown on medium+ */}
      <ul className='hidden md:flex gap-4 lg:gap-6 items-center bg-[#1e293b] rounded-full 
        px-6 lg:px-8 py-2 border border-gray-700'>
        {navItems.map((item) => (
          <li key={item}>
            <a href="#" className='text-gray-300 font-medium text-sm lg:text-base hover:text-[#227aee] transition duration-200'>
              {item}
            </a>
          </li>
        ))}
      </ul>
    
      {/* Sign In/Logout - Hidden on mobile, shown on large+ */}
      <div className='hidden lg:flex'>
        {localStorage.getItem("access") ? ( 
          <button
            type="button"
            onClick={handleLogout}
            className="ml-4 flex items-center gap-2 rounded-full cursor-pointer border border-[#22d3ee] bg-[#22d3ee]/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#22d3ee] hover:text-white"
          >
            Logout <LogOut className="h-4 w-4" />
          </button>
        ) : (
          <a
            href="/signin"
            className="ml-4 flex items-center gap-2 rounded-full cursor-pointer border border-[#22d3ee] bg-[#22d3ee]/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#22d3ee] hover:text-white"
          >
            Sign In <LogIn className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Mobile Menu Button - Includes search icon for mobile */}
      <div className="flex items-center md:hidden">
        {/* Mobile Search Button */}
        <button className="p-2 text-gray-300 hover:text-white mr-2">
          <Search className="h-5 w-5" />
        </button>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none">
              <AlignRight className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-[#0f172a] border-l border-gray-800">
            <div className="flex h-full flex-col pt-8">
              <div className="mb-8 px-4">
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-[#22d3ee]">AUTO</span>MASTER
                </h1>
              </div>
              
              {/* Mobile Search Input */}
              <div className="px-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] text-sm"
                  />
                </div>
              </div>
              
              <nav className="flex-1 space-y-2 px-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block rounded-md px-4 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-[#1e293b] hover:text-[#22d3ee]"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              
              <div className="p-4">
                {localStorage.getItem("access")? (
                  <button type='button' onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-full cursor-pointer border border-[#22d3ee] bg-[#22d3ee]/10 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#22d3ee] hover:text-white">
                  Logout <LogOut className="h-4 w-4" />
                  </button>
                ) : (
                  <a href='/signin' className="flex w-full items-center justify-center gap-2 rounded-full cursor-pointer border border-[#22d3ee] bg-[#22d3ee]/10 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#22d3ee] hover:text-white">
                  Sign In <LogIn className="h-4 w-4" />
                  </a>
                )}                            
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header