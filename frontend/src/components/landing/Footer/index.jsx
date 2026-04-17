import React from "react";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-violet-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand section (Takes up more space on large screens) */}
          <div className="lg:col-span-5 space-y-6 text-base">
            <a href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center rounded-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white " />
              </div>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">
                AI Ebook Creator
              </span>
            </a>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              Create, design, and publish stunning ebooks with the power of AI.
              Turn your ideas into professional books in minutes.
            </p>

            {/* Social links */}
            <div className="flex items-center space-x-5 pt-2">
              {/* <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-gray-400 hover:text-violet-500 transition-colors transform hover:scale-110 duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-violet-600 transition-colors transform hover:scale-110 duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Quick links (Grid layout for the 3 columns) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 text-base">
            {/* Column 1 */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#templates"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Templates
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#privacy"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-gray-500 hover:text-violet-600 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} AI eBook Creator. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              Made with <span className="text-red-500 mx-1.5 text-lg">❤︎</span>{" "}
              for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
