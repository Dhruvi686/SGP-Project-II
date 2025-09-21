import React from "react";
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

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-red-900 text-white py-8 px-6 ">
        <h1 className="text-3xl font-bold">Travel Safety in Ladakh</h1>
        <p className="mt-2 text-lg max-w-2xl">
          Essential information to ensure a safe and enjoyable journey in the
          high-altitude region of Ladakh
        </p>
        <div className="mt-4 flex gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FiPhone className="text-white" />
            Emergency Contacts
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded border border-white/20 shadow-lg hover:bg-white/20 transition">
            Download Safety Guide
          </button>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          Emergency Contacts
        </h2>
        <p className="text-center mb-8">
          Save these numbers before your trip to Ladakh
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Tourist Emergency Helpline",
              icon: <FiPhone />,
              number: "+91-1982-252-271",
            },
            {
              label: "Medical Emergency",
              icon: <FaRegHeart />,
              number: "+91-1982-252-012",
            },
            {
              label: "Mountain Rescue",
              icon: <FaMountain />,
              number: "+91-1982-252-118",
            },
            {
              label: "Police Control Room",
              icon: <FaExclamationTriangle />,
              number: "+91-1982-252-244",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border-3 border-red-500 rounded-md p-4 text-center shadow-md bg-white"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-400 text-lg  mx-auto mb-3">
                {item.icon}
              </div>
              <p className="font-semibold">{item.label}</p>
              <p className="text-sm mt-1">{item.number}</p>
              <p className="text-green-700 bg-green-100 inline-block px-2 py-1 text-xs rounded mt-2">
                Available 24/7
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Tips */}
      <section className="bg-gray-100 py-8 px-4">
        <h2 className="text-xl font-bold text-center mb-2">
          Essential Safety Tips
        </h2>
        <p className="text-center text-sm mb-4">
          Important guidelines to ensure your safety while exploring Ladakh
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            "Altitude Sickness",
            "Weather Conditions",
            "Road Safety",
            "Health Precautions",
          ].map((tip, i) => (
            <span
              key={i}
              className="bg-white border px-3 py-1 rounded-full text-sm"
            >
              {tip}
            </span>
          ))}
        </div>
        <div className="max-w-3xl mx-auto bg-white border rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Altitude Sickness
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>
              Acclimatize properly – spend 2-3 days in Leh (11,500 ft) before
              going higher
            </li>
            <li>Stay hydrated and drink plenty of water</li>
            <li>Avoid alcohol and smoking during acclimatization</li>
            <li>Consider taking Diamox after consulting with your doctor</li>
            <li>Descend immediately if symptoms worsen</li>
          </ul>
        </div>
      </section>

      {/* Medical Facilities */}
      <div className="bg-white text-gray-800">
        {/* Medical Facilities */}
        <section className="py-10 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Medical Facilities
          </h2>
          <p className="text-center mb-8">
            Hospitals and medical centers in Ladakh region
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {medicalFacilities.map((hospital, i) => (
              <div
                key={i}
                className="border-1 border-gray-400 p-6 shadow-md bg-white rounded-md min-h-[280px]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <p className="text-md text-gray-600 flex items-center gap-1">
                      <FaMapMarkerAlt /> {hospital.location}
                    </p>
                  </div>
                  <FaRegHeart className="text-red-300 text-lg" />
                </div>
                <div className="mt-3 text-sm text-gray-700">
                  <span className="text-base  text-gray-700">Services:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {hospital.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="border border-gray-300 bg-gray-100 px-2 py-1 rounded text-sm text-gray-700"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm p-2">
                  <p>
                    <span className="text-base text-gray-700">Contact:</span>
                  </p>
                  <p className="font-bold">+91-1982-252-012</p>
                  <br />
                  <p>
                    <span className="mt-2 text-base  text-gray-700">
                      Coordinates:
                    </span>
                  </p>
                  <p className="font-bold">34.1526°N, 77.5771°E</p>
                </div>
                <button className="mt-3 w-full bg-blue-900 text-white py-2 rounded">
                  View on Map
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Weather Alerts</h2>

          <div className="flex items-start gap-4 border-1 border-red-800 bg-yellow-50 p-4 mb-4 rounded">
            <div className="text-2xl rounded-md px-3 py-1 text-red-800">⛰️</div>
            <div>
              <h3 className="text-red-800 font-semibold text-lg">
                High Altitude Passes
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Khardung La and Chang La passes may experience sudden weather
                changes. Check conditions before traveling.
              </p>
            </div>
          </div>

          {/* Leh and Surrounding Areas */}
          <div className="flex items-start gap-4 border-1 border-green-400 bg-green-50 p-4 mb-4 rounded">
            <div className="text-2xl  rounded-md px-3 py-1 text-green-600">
              <FiSun />
            </div>
            <div>
              <h3 className="text-green-600 font-semibold text-lg">
                Leh and Surrounding Areas
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Clear skies with temperatures ranging from 15°C to 25°C during
                the day. UV index is very high.
              </p>
            </div>
          </div>

          {/* Nubra Valley */}
          <div className="flex items-start gap-4 border-1 border-blue-400 bg-blue-100 p-4 rounded">
            <div className="text-2xl rounded-md px-3 py-1 text-blue-600">
              <FiDroplet />
            </div>
            <div>
              <h3 className="text-blue-600 font-semibold text-lg">
                Nubra Valley
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                Occasional light showers expected in the afternoon. Roads are
                open and in good condition.
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-4 border-gray-200  shadow-md border min-h-[420px]"
          style={{
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
            marginTop: "-18px",
          }}
        >
          <h2 className="text-2xl font-bold mb-2">Emergency Preparedness</h2>
          <p className="text-gray-600 mb-4">
            Being prepared for emergencies is essential when traveling in remote
            areas of Ladakh.
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500">●</span> Carry a basic first aid
              kit with altitude sickness medication
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">●</span> Keep emergency contact
              numbers saved offline
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">●</span> Download offline maps for
              navigation in areas without network
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">●</span> Inform someone about your
              travel itinerary before heading to remote areas
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">●</span> Carry extra food, water,
              and warm clothing even on day trips
            </li>
          </ul>

          <button className="mt-12 bg-red-500 text-white font-semibold rounded w-full sm:w-[400px] md:w-[330px] lg:w-[500px] h-[50px] shadow">
            Download Emergency Guide
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmergencyPage;
