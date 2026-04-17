import React from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default LandingPage;
