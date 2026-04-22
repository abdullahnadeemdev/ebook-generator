import React, { Children, useEffect, useRef, useState } from "react";

const Dropdown = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer transition-transform active:scale-95"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 ring-1 ring-black/5 focus:outline-none 
                   animate-in fade-in zoom-in-95 duration-200"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-2 px-1.5" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onclose}
      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 text-left"
      role="menuitem"
      tabIndex="-1"
    >
      {children}
    </button>
  );
};

export default Dropdown;
