import React from "react";

const InputField = ({ icon: Icon, lavel, name, ...props }) => {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none  ">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <input
          type="text"
          id={name}
          name={name}
          {...props}
          className={`w-full h-11 py-2 border border-gray-200 runded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent  transition-all duration-200 ${Icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
};

export default InputField;
