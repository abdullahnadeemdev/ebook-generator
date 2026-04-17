import React from "react";
import { FEATURES } from "../../../utils/data.js";

const Features = () => {
  return (
    <div id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100">
            <span className="text-sm font-semibold text-violet-700 tracking-wide uppercase">
              Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Everything You Need to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
              Create Your Ebook
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our platform is packed with powerful features to help you write,
            design, and publish your own ebook effortlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-violet-100 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Decorative background glow that appears on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10"></div>

                <div className="flex-1">
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Link */}
                <div className="mt-8">
                  <span className="inline-flex items-center text-sm font-semibold text-violet-600 group-hover:text-violet-700 transition-colors">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Area */}
        <div className="mt-20 max-w-4xl mx-auto bg-linear-to-br from-violet-50 to-purple-50 rounded-3xl p-10 text-center border border-violet-100 shadow-sm">
          <p className="text-2xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-linear-to-r from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/30 hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/50 transition-all duration-200 hover:scale-105"
          >
            <span>Start Creating Today</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3" /* Made the arrow a bit longer for visual balance */
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
