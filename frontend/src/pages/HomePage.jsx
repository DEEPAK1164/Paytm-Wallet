import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import image from '../image.png';
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-indigo-800 h-screen text-white relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-indigo-900 flex items-center justify-between px-8">
          <img src={image} alt="Paytm-logo" className="h-14 rounded-full" />
          <div className="flex items-center space-x-4">
            <button
              className="bg-white text-indigo-800 py-2 px-8 rounded-full hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
            <button
              className="bg-white text-indigo-800 py-2 px-8 rounded-full hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Paytm Wallet
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Let's experience the convinience of digital transactions!
          </p>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
