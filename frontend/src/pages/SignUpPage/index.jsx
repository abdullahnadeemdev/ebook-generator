import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, BookOpen } from "lucide-react";
import { toast } from "react-toastify";

import InputField from "../../components/shared/InputField";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // 2. Call your registration endpoint
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        payload,
      );

      const { token } = response.data;

      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      login(profileResponse.data, token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-white to-purple-50 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="w-full max-w-md relative z-10 py-10">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-500/10 border border-gray-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/30 mb-6 group transition-transform duration-300 hover:scale-105">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Create an Account
            </h1>
            <p className="text-gray-500 font-medium">
              Start publishing your ebooks today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="min 6 characters"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full"
            />

            <div className="pt-2">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full py-3.5 text-base font-semibold text-white bg-linear-to-r from-violet-500 to-purple-600 rounded-xl shadow-md hover:from-violet-600 hover:to-purple-700 transition-all duration-200"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600 font-medium text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-600 font-bold hover:text-violet-800 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
