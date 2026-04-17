import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProfileDropdown from "../ProfileDropdown/index";
import { Menu, X, BookOpen, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  return (
    <header>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center rounded-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-white " />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              AI Ebook Creator
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50/50 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Auth buttons & Profile */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={() => {
                  logout();
                  setProfileDropdownOpen(false);
                }}
              />
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-5 py-2 text-sm font-medium text-white bg-linear-to-r from-violet-400 to-purple-500 rounded-lg hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200 hover:scale-105"
                >
                  Get Started
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-lg p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            {isOpen ? (
              <X className="h-5 w-5 " />
            ) : (
              <Menu className="h-5 w-5 " />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50">
          <div className="px-4 pt-4 pb-6 space-y-6">
            {/* 1. Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* 2. Mobile Auth Section */}
            <div className="pt-6 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-4">
                  {/* Logged In: User Profile Info */}
                  <div className="flex items-center px-4">
                    <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-xl">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  {/* Logged In: Logout Button */}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 px-2">
                  <a
                    href="/login"
                    className="w-full flex justify-center px-4 py-3 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="w-full flex justify-center px-5 py-3 text-base font-medium text-white bg-linear-to-r from-violet-400 to-purple-500 rounded-xl shadow-md hover:from-violet-500 hover:to-purple-600 transition-all"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
