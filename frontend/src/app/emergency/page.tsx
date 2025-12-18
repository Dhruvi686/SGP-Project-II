"use client";

import React from "react";
import Link from "next/link";
import {
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaRegHeart,
  FaMountain,
} from "react-icons/fa";
import { FiDroplet, FiPhone, FiSun } from "react-icons/fi";

const EmergencyPage = () => {
  const medicalFacilities = [
    {
      name: "SNM Hospital",
      location: "Leh City",
      services: [
        "Emergency Care",
        "Altitude Sickness Treatment",
        "General Medicine",
      ],
    },
    {
      name: "Sonam Norboo Memorial Hospital",
      location: "Leh City",
      services: ["24/7 Emergency", "Surgery", "Oxygen Support"],
    },
    {
      name: "Army General Hospital",
      location: "Leh Cantonment",
      services: ["Emergency Care", "Advanced Medical Facilities"],
    },
    {
      name: "Nubra Valley Medical Center",
      location: "Diskit, Nubra Valley",
      services: ["Basic Emergency Care", "First Aid"],
    },
  ];

  const handleViewOnMap = (location: string) => {
    const query = encodeURIComponent(location + ", Ladakh");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Travel Safety in Ladakh</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Essential information to ensure a safe and enjoyable journey in the
              high-altitude region of Ladakh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300">
                <FiPhone className="text-white" />
                Emergency Contacts
              </button>
              <button className="bg-white/20 backdrop-blur-md border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-900 transition-all duration-300">
                Download Safety Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section id="emergency-contacts" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Save these numbers before your trip to Ladakh. Keep them handy for any emergency situation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Tourist Emergency Helpline",
                icon: <FiPhone />,
                number: "‪+91-1982-252-271‬",
                color: "bg-blue-100 text-blue-600",
              },
              {
                label: "Medical Emergency",
                icon: <FaRegHeart />,
                number: "‪+91-1982-252-012‬",
                color: "bg-red-100 text-red-600",
              },
              {
                label: "Mountain Rescue",
                icon: <FaMountain />,
                number: "‪+91-1982-252-118‬",
                color: "bg-green-100 text-green-600",
              },
              {
                label: "Police Control Room",
                icon: <FaExclamationTriangle />,
                number: "‪+91-1982-252-244‬",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className={`w-20 h-20 flex items-center justify-center rounded-full ${item.color} text-3xl mx-auto mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{item.label}</h3>
                  <p className="text-gray-600 mb-4 font-mono text-lg font-semibold">{item.number}</p>
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                    Available 24/7
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">Essential Safety Tips</h2>
          <p className="text-center text-gray-600 mb-8">
            Important guidelines to ensure your safety while exploring Ladakh
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "Altitude Sickness",
              "Weather Conditions", 
              "Road Safety",
              "Health Precautions",
            ].map((tip, i) => (
              <span
                key={i}
                className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition"
              >
                {tip}
              </span>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Altitude Sickness Prevention
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Acclimatize properly – spend 2-3 days in Leh (11,500 ft) before going higher</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Stay hydrated and drink plenty of water</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Avoid alcohol and smoking during acclimatization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Consider taking Diamox after consulting with your doctor</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Descend immediately if symptoms worsen</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Medical Facilities Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">Medical Facilities</h2>
        <p className="text-center text-gray-600 mb-8">
          Hospitals and medical centers in Ladakh region
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicalFacilities.map((hospital, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      {hospital.location}
                    </p>
                  </div>
                  <FaRegHeart className="text-red-400 text-2xl" />
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4 text-sm">
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Contact:</span> +91-1982-252-012
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Coordinates:</span> 34.1526°N, 77.5771°E
                  </p>
                </div>
                
                <button 
                  onClick={() => handleViewOnMap(hospital.name)}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
                >
                  View on Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weather Alerts & Emergency Preparedness Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Weather Alerts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Weather Alerts</h2>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">⛰</div>
                    <div>
                      <h3 className="text-yellow-800 font-bold text-lg mb-2">
                        High Altitude Passes
                      </h3>
                      <p className="text-yellow-700 text-sm">
                        Khardung La and Chang La passes may experience sudden weather
                        changes. Check conditions before traveling.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl text-green-600">
                      <FiSun />
                    </div>
                    <div>
                      <h3 className="text-green-800 font-bold text-lg mb-2">
                        Leh and Surrounding Areas
                      </h3>
                      <p className="text-green-700 text-sm">
                        Clear skies with temperatures ranging from 15°C to 25°C during
                        the day. UV index is very high.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl text-blue-600">
                      <FiDroplet />
                    </div>
                    <div>
                      <h3 className="text-blue-800 font-bold text-lg mb-2">
                        Nubra Valley
                      </h3>
                      <p className="text-blue-700 text-sm">
                        Occasional light showers expected in the afternoon. Roads are
                        open and in good condition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Preparedness */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency Preparedness</h2>
              <p className="text-gray-600 mb-6">
                Being prepared for emergencies is essential when traveling in remote
                areas of Ladakh.
              </p>

              <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Carry a basic first aid kit with altitude sickness medication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Keep emergency contact numbers saved offline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Download offline maps for navigation in areas without network</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Inform someone about your travel itinerary before heading to remote areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Carry extra food, water, and warm clothing even on day trips</span>
                  </li>
                </ul>

                <button className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition">
                  Download Emergency Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmergencyPage;
