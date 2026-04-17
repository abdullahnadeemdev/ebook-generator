import React from "react";
import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router";
import { heroImg } from "../../../assets/images";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative bg-linear-to-br from-violet-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-violet-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-semibold text-violet-900 tracking-wide">
                AI-Powered Publishing
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Create Stunning <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
                Ebooks in Minutes
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              From idea to published ebook, our AI-powered platform helps you
              write, design, and export professional-quality books effortlessly.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-linear-to-r from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/30 hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/50 transition-all duration-200 hover:scale-105"
              >
                <span>Start Creating for Free</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <a
                href="#demo"
                className="group inline-flex items-center text-base font-medium text-gray-600 hover:text-violet-600 transition-colors"
              >
                <span>Watch Demo</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            {/* Statistics */}
            <div className="flex items-center pt-8 border-t border-gray-200/60 space-x-8">
              <div>
                <div className="text-3xl font-extrabold text-gray-900">
                  50K+
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  Books Created
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gray-200"></div>

              <div>
                <div className="text-3xl font-extrabold text-gray-900">
                  4.9/5
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  User Rating
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gray-200"></div>

              <div>
                <div className="text-3xl font-extrabold text-gray-900">
                  10min
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  Avg. Creation
                </div>
              </div>
            </div>
          </div>

          {/* Right Content / Image Display */}
          <div className="relative mt-12 lg:mt-0 lg:ml-10">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/50 group">
              <div className="absolute inset-0 bg-linear-to-tr from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={heroImg}
                alt="AI Ebook Creator Dashboard"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* Floating Card 1: Processing */}
            <div className="absolute -top-6 -left-6 lg:-left-12 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-violet-100 flex items-center space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Processing
                </div>
                <div className="text-sm font-bold text-gray-900">
                  AI Generation
                </div>
              </div>
            </div>

            {/* Floating Card 2: Completed */}
            <div className="absolute -bottom-6 -right-6 lg:-right-8 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-violet-100 flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Completed
                </div>
                <div className="text-sm font-bold text-gray-900">247 Pages</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
