import React from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={onToggle}
        // Reduced gap from space-x-3 to space-x-2 for a tighter layout
        className="flex items-center p-1.5 pr-2 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-200 focus:outline-none"
      >
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-violet-100 shadow-sm"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-100 to-purple-100 flex items-center justify-center border-2 border-white shadow-sm">
            {/* Darkened text and slightly increased size for better visibility */}
            <span className="text-violet-900 font-extrabold text-base">
              {companyName?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}

        {/* User Info (Hidden on mobile, visible on medium+ screens) */}
        <div className="hidden md:block text-left ml-1">
          <p className="text-sm font-semibold text-gray-900 leading-tight truncate w-32">
            {companyName}
          </p>
          <p className="text-xs font-medium text-gray-500 truncate w-32">
            {email}
          </p>
        </div>

        {/* Arrow Indicator */}
        <ChevronDown
          // Darkened from gray-400 to gray-600 for better contrast
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
          {/* Mobile Header */}
          <div className="md:hidden px-4 py-3 border-b border-gray-50 mb-2">
            <p className="text-sm font-bold text-gray-900 truncate">
              {companyName}
            </p>
            <p className="text-xs font-medium text-gray-500 truncate">
              {email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="px-2">
            <button
              onClick={() => {
                onToggle();
                navigate("/profile");
              }}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors group"
            >
              <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-violet-500 transition-colors" />
              View Profile
            </button>

            <div className="h-px bg-gray-100 my-1 mx-2"></div>

            <button
              onClick={(e) => {
                e.preventDefault();
                onLogout();
              }}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3 text-red-500" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
