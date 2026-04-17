import React from "react";
import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router";
import { hero } from "../../../assets/images";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div>
        <div>
          {/* left content */}
          <div>
            <div>
              <Sparkles />
              <span>AI-Powered Publishing</span>
            </div>

            <h1 className="">
              Create Stunning <span>Ebooks in Minutes</span>
            </h1>
            <p>
              From idea to published ebook,our AI-powered platform helps you
              write,design and export porfessional-quality books effortlessly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
