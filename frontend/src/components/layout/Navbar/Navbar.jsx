import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProfileDropdown from "../ProfileDropdown";
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
          {/* {logo} */}
          <a href="/" className="">
            <div className="">
              <BookOpen />
            </div>
            <span className="">AI Ebook Creator</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="">
            {navLinks.map((link) => {
              <a key={link.name} href={link.href} className="">
                {link.name}
              </a>;
            })}
          </nav>

          {/* AUth butttons & Profile  */}
          <div>
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
                onLogout={() => console.log("Logout")}
              />
            ) : (
              <>
                <a href="/login  " className="">
                  Login
                </a>
                <a href="/signup  " className="">
                  Get Started
                </a>
              </>
            )}
          </div>

          {/* mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="">
            {isOpen ? <X className="" /> : <Menu className="" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
