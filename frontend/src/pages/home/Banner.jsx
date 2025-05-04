
import React from 'react';
import bannerImg from "../../assets/ChampionBanner.jpg";

const Banner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      
      {/* Full-width banner image */}
      <div className="w-full">
        <img 
          src={bannerImg} 
          alt="Champion Banner"
          className="w-full h-[700px] object-cover"
        />
      </div>

      {/* Text section below the image */}
      <div className="max-w-4xl px-6 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold mb-6">We Will Rock You</h1>
        <p className="text-base md:text-lg mb-8">
        Welcome to the Official Merchandise Store of the Prestigious Electronics & Communication Engineering Discipline of Khulna University.
        </p>
      </div>

    </div>
  );
};

export default Banner;