import React from "react";
import { TESTIMONIALS } from "../../../utils/data";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className="relative py-24 bg-violet-50/50 overflow-hidden"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-violet-100 shadow-sm">
            <Star
              className="w-4 h-4 text-violet-600 mr-2"
              fill="currentColor"
            />
            <span className="text-sm font-semibold text-violet-800 tracking-wide uppercase">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Loved by Creators <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
              Everywhere
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Don't just take our word for it. Here's what our users have to say
            about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ✅ BUG FIX 1: Swapped testimonial and index */}
          {TESTIMONIALS.map((testimonial, index) => (
            // ✅ BUG FIX 2: Used parentheses ( ) for implicit return
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Large Background Quote Icon */}
              <div className="absolute top-6 right-6 text-violet-100 group-hover:text-violet-200 transition-colors duration-300">
                <Quote size={48} />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex space-x-1 mb-6 relative z-10">
                  {/* ✅ BUG FIX 3: Used parentheses ( ) for implicit return */}
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-700 leading-relaxed text-base mb-8 relative z-10 italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center mt-auto pt-6 border-t border-gray-50 relative z-10">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  {/* Small decorative gradient dot on avatar */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm font-medium text-violet-600">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stats */}
        <div className="mt-20 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="text-center w-full md:w-1/3 pt-8 md:pt-0">
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
              50K+
            </div>
            <div className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wide">
              Happy Creators
            </div>
          </div>

          <div className="text-center w-full md:w-1/3 pt-8 md:pt-0">
            <div className="text-4xl font-extrabold text-gray-900">4.9/5</div>
            <div className="flex justify-center space-x-1 mt-2">
              {/* Quick visual to reinforce the 4.9 rating */}
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wide">
              Average Rating
            </div>
          </div>

          <div className="text-center w-full md:w-1/3 pt-8 md:pt-0">
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
              100K+
            </div>
            <div className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wide">
              Ebooks Created
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
