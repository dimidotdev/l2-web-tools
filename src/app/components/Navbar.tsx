'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaSignOutAlt, FaHome, FaClipboardList, FaTasks } from "react-icons/fa";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const activeLinkStyle = "text-white bg-accent-800 px-3 py-2 rounded-md text-sm font-medium";
  const inactiveLinkStyle = "text-primary-300 hover:text-white hover:bg-accent-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-accent-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-accent-800'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-white font-bold text-xl"
            >
              <span>NAD System</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`flex items-center gap-2 ${isActiveLink('/') ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <FaHome className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              href="/nads" 
              className={`flex items-center gap-2 ${isActiveLink('/nads') ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <FaClipboardList className="h-4 w-4" />
              <span>NAD Board</span>
            </Link>
            <Link
              href="/todos"
              className={`flex items-center gap-2 ${isActiveLink('/todos') ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <FaTasks className="h-4 w-4" />
              <span>Development Tasks</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-gray-300 bg-gray-700 px-3 py-2 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <FaUser className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{user?.username || 'User'}</span>
                </div>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <Link 
                href="/" 
                className={`flex items-center gap-2 ${isActiveLink('/') ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                href="/nads" 
                className={`flex items-center gap-2 ${isActiveLink('/nads') ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaClipboardList className="h-4 w-4" />
                <span>NAD Board</span>
              </Link>
              <Link
                href="/todos"
                className={`flex items-center gap-2 ${isActiveLink('/todos') ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTasks className="h-4 w-4" />
                <span>Development Tasks</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between text-gray-300 px-3 py-2 border-t border-gray-700 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <FaUser className="h-4 w-4" />
                      </div>
                      <span>{user?.username || 'User'}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <Link 
                    href="/login" 
                    className="block text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}