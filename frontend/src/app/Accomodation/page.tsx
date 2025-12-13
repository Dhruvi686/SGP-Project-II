"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React from "react";
import {
  FaHotel,
  FaHome,
  FaCampground,
} from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegStar, FaUserFriends } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
type Property = {
  title: string;
  price: string;
  unit: string;
  location: string;
  imageUrl: string;
  tags: string[];
};

const accommodations = [
  {
    title: "Hotels",
    description: "Comfortable stays with modern amenities",
    icon: <FaHotel className="text-white text-2xl" />,
    bgColor: "bg-blue-600",
    properties: "120+ Properties",
  },
  {
    title: "Homestays",
    description: "Authentic local experiences with families",
    icon: <FaHome className="text-white text-2xl" />,
    bgColor: "bg-green-500",
    properties: "200+ Properties",
  },
  {
    title: "Guest Houses",
    description: "Budget-friendly accommodations",
    icon: <MdBedroomParent className="text-white text-2xl" />,
    bgColor: "bg-purple-600",
    properties: "85+ Properties",
  },
  {
    title: "Camping",
    description: "Scenic Camping sites with facilities",
    icon: <FaCampground className="text-white text-2xl" />,
    bgColor: "bg-orange-600",
    properties: "45+ Sites",
  },
];

const properties: Property[] = [
  {
    title: "Grand Himalayan Resort",
    price: "₹5,000",
    unit: "/Night",
    location: "Leh City Center",
    imageUrl: "/image/accomodation/g.png",
    tags: ["Free Wifi", "Restaurant", "Room Service", "+1 more"],
  },
  {
    title: "Ladakhi Heritage Homestay",
    price: "₹2,200",
    unit: "/Day",
    location: "Nubra Valley",
    imageUrl: "/image/accomodation/l1.png",
    tags: ["Home-cooked Meals", "Garden", "Cultural Activities", "+1 more"],
  },
  {
    title: "Pangong Lake View Camp",
    price: "₹3,800",
    unit: "/Day",
    location: "Pangong Lake",
    imageUrl: "/image/accomodation/p1.png",
    tags: ["Lakeside View", "Heated Tents", "Dining Area", "+1 more"],
  },
  {
    title: "Zanskar Valley Guest House",
    price: "₹1,500",
    unit: "/Night",
    location: "Zanskar Valley",
    imageUrl: "/image/accomodation/j1.png",
    tags: ["Free Breakfast", "Hot Water", "Trekking Arrangements", "+1 more"],
  },
  {
    title: "Royal Palace Hotel",
    price: "₹4,200",
    unit: "/Day",
    location: "Leh Market",
    imageUrl: "/image/accomodation/r1.png",
    tags: ["Restaurant", "Spa", "Airport Shuttle", "+1 more"],
  },
  {
    title: "Traditional Ladakhi Home",
    price: "₹1,800",
    unit: "/Day",
    location: "Thiksey Village",
    imageUrl: "/image/accomodation/t1.png",
    tags: ["Organic Food", "Farm Activities", "Cultural Experience", "+1 more"],
  },
];



export default function Homepage() {
  return (
    <main className="font-sans">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
        <h1 className="font-bold text-lg">
          <span className="text-blue-600">Leh</span>Go
        </h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li className="text-black font-bold">Home</li>
          <li className="text-gray-600 hover:text-black">Explore</li>
          <li className="text-gray-600 hover:text-black">Trip Planner</li>
          <li className="text-gray-600 hover:text-black">Bookings</li>
          <li className="text-gray-600 hover:text-black">Permits</li>
        </ul>
        <button className="bg-blue-900 text-white text-sm px-4 py-2 rounded">
          Make Your Trip
        </button>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-800 text-white text-center py-10 px-4">
        <h2 className="text-4xl font-bold mb-4">Find Your Perfect Stay in Ladakh</h2>
        <p className="text-md max-w-xl mx-auto mb-6">
          Discover government-verified accommodation from luxury hotels to authentic home-stays
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium">
            🔍 Search Accommodation
          </button>
          <button className="border border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-md font-medium transition">
            View Special Offers
          </button>
        </div>
      </section>

      {/* Accommodation Types */}
      <section className="text-center py-12 px-4">
        <h3 className="text-2xl font-bold mb-8">Accommodation Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {accommodations.map((acc) => (
            <div
              key={acc.title}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${acc.bgColor}`}>
                {acc.icon}
              </div>
              <h4 className="text-lg font-bold mb-2">{acc.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{acc.description}</p>
              <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {acc.properties}
              </span>
            </div>
          ))}
        </div>
      </section>


        {/* Featured Properties */}
    <section className="py-12 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-2 text-blue-900">Featured Properties</h2>
      <p className="text-gray-600 mb-10 text-sm">
        Handpicked accommodations that offer exceptional experiences
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {properties.map((prop, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={prop.imageUrl}
                alt={prop.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="mb-2 text-left">
                <h3 className="font-semibold text-lg">{prop.title}</h3>

                <div className="text-sm mb-3">
                From{" "}
                <span className="text-blue-600 font-semibold">
                  {prop.price}
                </span>{" "}
                {prop.unit}
              </div>
                <div className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  {prop.location}
                </div>
                
              </div>

              <div className="flex flex-wrap gap-2 text-xs mb-4">
                {prop.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 border text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-auto bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button className="border border-blue-700 text-blue-700 px-6 py-2 rounded hover:bg-blue-50">
          View All Accommodation
        </button>
      </div>
    </section>

<section className="px-4 py-12 bg-white max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Safety First Section */}
      <div>
        <h2 className="text-xl font-bold mb-6">Safety First</h2>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <FaRegStar className="text-blue-500 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold">Government Verified</h3>
              <p className="text-sm text-gray-600">
                All accommodations are verified and approved by the Government of Ladakh
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <FaUserFriends className="text-blue-500 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold">Direct Booking</h3>
              <p className="text-sm text-gray-600">
                Book directly with property owners, without middlemen or extra fees
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-blue-500 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold">Local Support</h3>
              <p className="text-sm text-gray-600">
                24/7 assistance from our local team throughout your stay
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Booking Tips Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Booking Tips</h2>
        <ul className="space-y-4 text-sm text-gray-800">
          <li className="flex gap-2">
            <BsCheckCircleFill className="text-green-500 mt-1" />
            Book accommodations 2–3 months in advance during peak season (May–September)
          </li>
          <li className="flex gap-2">
            <BsCheckCircleFill className="text-green-500 mt-1" />
            Consider homestays for an authentic cultural experience
          </li>
          <li className="flex gap-2">
            <BsCheckCircleFill className="text-green-500 mt-1" />
            Check if the property has oxygen support or medical facilities nearby
          </li>
          <li className="flex gap-2">
            <BsCheckCircleFill className="text-green-500 mt-1" />
            Confirm heating arrangements if traveling during winter months
          </li>
          <li className="flex gap-2">
            <BsCheckCircleFill className="text-green-500 mt-1" />
            Ask about altitude acclimatization support, especially for first-time visitors
          </li>
        </ul>
      </div>
    </section>
    </main>
    );
}
