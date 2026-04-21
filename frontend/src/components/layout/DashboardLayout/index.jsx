import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Album } from "lucide-react";
import ProfileDropdown from "../ProfileDropdown";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2.5 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="w-9 h-9 bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center rounded-xl shadow-md shadow-violet-500/20">
              <Album className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
              AI Ebook Creator
            </span>
          </Link>

          <div className="relative flex items-center">
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative">{children}</main>
    </div>
  );
};

export default DashboardLayout;
