import React from "react";
import animationData from "../../../assets/apply-job.json"
import Lottie from "react-lottie-player";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('https://i.ibb.co/WvdWyRgv/1690202104783.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-3">Find Your Dream Job</h1>
        <p className="text-lg mb-5">
          Explore thousands of job opportunities and land your dream career today.
          We are always here for you with something new.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Lottie loop animationData={animationData} play className="w-7 h-7" />
            Apply Jobs
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500">
            See All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
