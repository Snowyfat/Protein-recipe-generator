
import React from 'react';

const Hero: React.FC = () => (
  <header className="text-center">
    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
      Protein Recipe Generator
    </h1>
    <p className="mt-4 text-lg md:text-xl text-teal-200 max-w-2xl mx-auto">
      Have some protein but no ideas? Enter your ingredients below and let AI craft a unique recipe just for you.
    </p>
  </header>
);

export default Hero;
