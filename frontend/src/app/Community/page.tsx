"use client";
import React from "react";
import Image from "next/image";
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import {
  FaUsers,
  FaShareAlt,
  FaCalendarAlt,
  FaGlobeAsia,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import type { IconType } from "react-icons";

// Types
interface Discussion {
  title: string;
  author: string;
  timeAgo: string;
  tags: string[];
  replies: number;
}

interface Feature {
  title: string;
  description: string;
  icon: IconType;
  buttonText: string;
  color?: string;
}

interface Meetup {
  title: string;
  date: string;
  location: string;
  attendees: number;
  imageUrl: string;
}

// Data
const features: Feature[] = [
  {
    title: "Discussion Forums",
    description: "Connect with fellow travelers and locals",
    icon: FaUsers,
    buttonText: "Explore Discussion Forums",
    color: "bg-blue-500 text-white",
  },
  {
    title: "Trip Reports",
    description: "Share your experiences and read others",
    icon: FaShareAlt,
    buttonText: "Explore Trip Reports",
    color: "bg-green-500 text-white",
  },
  {
    title: "Meetups",
    description: "Join local events and traveler gatherings",
    icon: FaCalendarAlt,
    buttonText: "Explore Meetups",
    color: "bg-purple-500 text-white",
  },
  {
    title: "Local Insights",
    description: "Get tips and advice from Ladakh residents",
    icon: FaGlobeAsia,
    buttonText: "Explore Local Insights",
    color: "bg-orange-500 text-white",
  },
];

const discussions: Discussion[] = [
  {
    title: "Best time to visit Pangong Lake?",
    author: "Rahul Sharma",
    timeAgo: "2 hours ago",
    tags: ["Travel Planning", "Lakes", "Weather"],
    replies: 24,
  },
  {
    title: "Looking for trekking partners in July",
    author: "Sarah Johnson",
    timeAgo: "5 hours ago",
    tags: ["Trekking", "Group Travel", "Summer"],
    replies: 18,
  },
  {
    title: "Homestay recommendations in Nubra Valley",
    author: "Amit Patel",
    timeAgo: "1 day ago",
    tags: ["Accommodation", "Nubra Valley", "Homestays"],
    replies: 32,
  },
  {
    title: "Road conditions update - June 2024",
    author: "Local Guide Tenzin",
    timeAgo: "12 hours ago",
    tags: ["Road Updates", "Travel Advisory"],
    replies: 18,
  },
  {
    title: "Traditional food you must try in Ladakh",
    author: "Maya Thakur",
    timeAgo: "3 days ago",
    tags: ["Food", "Culture", "Local Cuisine"],
    replies: 32,
  },
  {
    title: "Photography spots around Leh",
    author: "David Wilson",
    timeAgo: "2 days ago",
    tags: ["Photography", "Landscapes"],
    replies: 18,
  },
];

const meetups: Meetup[] = [
  {
    title: "Travelers Meetup - Leh Main Market",
    date: "June 15, 2024 at 5:00 PM",
    location: "Leh Main Market Square",
    attendees: 28,
    imageUrl: "/image/homepage/Rectangle 1140.png",
  },
  {
    title: "Photography Walk – Shanti Stupa",
    date: "June 18, 2024 at 6:30 AM",
    location: "Shanti Stupa Entrance",
    attendees: 15,
    imageUrl: "/image/homepage/Rectangle 1141.png",
  },
  {
    title: "Cultural Exchange Evening",
    date: "June 20, 2024 at 7:00 PM",
    location: "Ladakh Arts & Culture Center",
    attendees: 15,
    imageUrl: "/image/homepage/Rectangle 1142.png",
  },
];

const Community: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50 text-justify">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-700">
          Leh<span className="text-black">Go</span>
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <span role="img" aria-label="globe">
            🌐
          </span>
          EN
          <MdEmergency className="text-red-500" size={18} />
          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
            LIVE
          </span>
        </div>
      </nav>

      {/* Community Section */}
      <section className="bg-blue-800 text-white py-6 px-4">
        <h2 className="text-lg font-semibold">Ladakh Tourism community</h2>
        <p className="mt-1 text-sm">
          Connect with fellow travelers, share experiences, and get insider tips from locals.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            Join Community
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Browse Discussion
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-10 px-4">
        <h2 className="text-center text-2xl font-bold mb-8">Community Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="border rounded-xl shadow-sm p-6 flex flex-col items-center text-center"
              >
                <div
                  className={`rounded-full p-3 mb-3 ${feature.color ?? "bg-gray-200 text-gray-700"} inline-flex`}
                >
                  <Icon className="text-2xl" />

                  </div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <button className="text-sm font-medium px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-300 transition">
                  {feature.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      
      {/* Discussions */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Active Discussions</h2>
          <p className="text-gray-600">
            Join conversations, ask questions, and share your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {discussions.map((discussion, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base mb-1">{discussion.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  By {discussion.author} · {discussion.timeAgo}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {discussion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>💬 {discussion.replies} replies</span>
                <a href="#" className="text-blue-600 font-medium hover:underline">
                  View Thread
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium px-6 py-2 rounded-full transition">
            View All Discussions →
          </button>
        </div>
      </section>

      {/* Meetups */}
      <section className="py-12 px-4 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Upcoming Meetups</h2>
          <p className="text-gray-600">
            Connect with other travelers and locals in person
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {meetups.map((meetup, index) => (
            <div key={index} className="border relative-lg overflow-hidden shadow-sm bg-white">
              <div className="relative h-70 w-full">
                <Image src={meetup.imageUrl} alt={meetup.title} layout="fill" className="object-cover"/>
              </div>
              <div className=" p-4 flex flex-col flex-grow space-y-2">
                <h3 className="font-semibold text-lg">{meetup.title}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  {meetup.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  {meetup.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaUsers className="mr-2 text-gray-500" />
                  {meetup.attendees} attending
                </div>
                <div className="text-center">
                <button className="mt-3 bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 transition">
                  Join Meetup
                </button></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
<footer className="bg-[#0C0E24] text-white text-sm">
      {/* Newsletter Subscription */}
      <div className="bg-[#1a1c38] py-8 px-4 sm:px-12 text-center">
        <h2 className="text-xl font-semibold mb-3">
          Stay Updated with Ladakh Adventures
        </h2>
        <p className="text-gray-300 mb-4">
          Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-2 ">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded w-full sm:w-64 text-white"/>
          
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-semibold">
            Subscribe
          </button>
        </form>
      </div>

      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-6 sm:px-12 py-12 border-t border-gray-600">
        {/* Logo & About */}
        <div className="md:col-span-1">
          <h3 className="font-bold text-lg text-blue-500">Leh Go</h3>
          <p className="mb-2 text-gray-400">Land of High Passes</p>
            <p className="mb-2">Your comprehensive platform to exploring the mystical beautiful Ladakh.from AI-Powered trip planning to local community support,we make your Ladakh journey unforgettable.</p>
            <p className="mb-2">+91-1982-252108 info@ladakhtourism.com Leh,Ladak,India.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="text-white-400 space-y-1">
            <li>Destinations</li>
            <li>Cultural Sites</li>
            <li>Adventure Tours</li>
            <li>Monasteries</li>
            <li>Photography Spots</li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h2 className="font-semibold mb-2">Services</h2>
          <ul className="text-white space-y-1">
            <li>Trip Planner</li>
            <li>Accommodation</li>
            <li>Transport</li>
            <li>Local Guides</li>
            <li>Permits</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="font-semibold mb-2">Useful Links</h2>
          <ul className="text-white-400 space-y-1">
            <li>Help Center</li>
            <li>Emergency Info</li>
            <li>Travel Insurance</li>
            <li>Safety Guidelines</li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="font-semibold mb-2">Company</h2>
          <ul className="text-white-400 space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Partners</li>
            <li>Sustainability</li>
          </ul>
        </div>
      </div>

      {/* Download App + Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 py-6 border-t border-gray-600">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-300">Download Our App</p>
          <h4 className="text-gray">Get the full Ladakh experience on your mobile device.</h4>
        </div>

        <div className="flex space-x-4">
          <button className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
            <FaApple className="mr-2" /> App Store
          </button>
          <button className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
            <FaGooglePlay className="mr-2" /> Google Play
          </button>
        </div>
      </div>

      {/* Legal Bottom */}
      <div className="bg-[#0B0D1F] py-4 text-right text-white-500 text-xs border-t border-gray-700">
        <p>
          |<span className="mr-2">Privacy Policy</span>|<span className="mb=2">Terms</span> | <span className="mb-2">Cookies</span>
         <p className="mb-2">© 2025 Ladakh Tourism Platform.All rights reserved.Made with ❤for sustainable Tourism</p>
        </p>
      </div>
    </footer>

</main>
  
  
  );
};

export default Community;
