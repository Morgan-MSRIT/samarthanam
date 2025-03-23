import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaPhoneAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const location = {
  centers: {
    acrossIndia: [
      "Bengaluru", "Mysuru", "Belagavi", "Dharwad", "Bellari", "Kodikonda",
      "Guntur", "Coimbatore", "Delhi", "Bhopal", "Mumbai", "Hyderabad",
      "Chennai", "Kochi", "Pune", "Kolkata", "Gurugram", "Bhubaneswar"
    ],
    outsideIndia: ["USA", "UK"]
  }
};

const Contact = () => {
  return (
    <div className="bg-accent pb-5 mb-5 relative">
      <div className="relative h-96 w-full">
        <img
          src="https://samarthanam.org/wp-content/uploads/2020/01/map.jpg"
          alt="map"
          className="object-cover w-full h-full"
        />
        
        {/* Centers in India */}
        <div className="absolute top-10 left-10 bg-white p-4 rounded-lg shadow-md">
          <p className="font-semibold text-lg py-2">Centers in India</p>
          <div className="grid grid-cols-2 gap-1 text-left">
            {location.centers.acrossIndia.map((center, index) => (
              <div key={index} className="flex items-center">
                <GoDotFill size={10} className="mr-2" /> {center}
              </div>
            ))}
          </div>
        {/* </div> */}
        
        {/* Centers Outside India */}
        {/* <div className="absolute top-10 right-10 bg-white p-4 rounded-lg shadow-md"> */}
          <p className="font-semibold text-lg py-2">Centers Outside India</p>
          <div className="grid grid-cols-2 gap-1 text-left">
            {location.centers.outsideIndia.map((center, index) => (
              <div key={index} className="flex items-center">
                <GoDotFill size={10} className="mr-2" /> {center}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helpline Information */}
      <div className="bg-white w-[90%] max-w-2xl mx-auto p-6 mt-10 border border-gray-300 rounded-lg shadow-md mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-6">Helpline Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="flex items-center justify-center">
            <FaPhoneAlt className="mr-3" />
            <a href="tel:+918068333999" className="hover:underline">
              080-68333999
            </a>
          </div>

          <div className="flex items-center justify-center">
            <FaEnvelope className="mr-3" />
            <a href="mailto:info@samarthanam.org" className="hover:underline">
              info@samarthanam.org
            </a>
          </div>

          <div className="flex items-center justify-center">
            <FaEnvelope className="mr-3" />
            <a href="mailto:kumar@samarthanam.org" className="hover:underline">
              kumar@samarthanam.org
            </a>
          </div>

          <div className="flex items-center justify-center">
            <FaPhone className="mr-3" />
            <a href="tel:+918025721444" className="hover:underline">
              +91 80 25721444 / 9922
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
