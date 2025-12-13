"use client";

import { useState } from "react";
import { FaSearch, FaFilter, FaShareAlt } from "react-icons/fa";
import { Calendar, MapPin, User, Star, Users, Phone, MessageSquare, Mail } from "lucide-react";
import Image from "next/image";

// Event card type
type truncate = (text: any, maxLength: any) => string;
type EventCardProps = {
  image: string;
  title: string;
  date: string;
  location: string;
  description: string;
  price: string;
  duration: string;
}

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Event card component
const EventCard = ({
  image,
  title,
  date,
  location,
  description,
  price,
  duration,
}: EventCardProps) => (
  <div className="bg-white rounded-xl shadow-md w-full max-w-sm overflow-hidden">
    <div className="w-full h-48 relative">
      <Image src={image} alt={title} layout="fill" objectFit="cover" />
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center text-sm text-gray-600 mt-2">
        <Calendar className="w-4 h-4 mr-1" /> {date}
      </div>
      <div className="flex items-center text-sm text-gray-600 mt-1">
        <MapPin className="w-4 h-4 mr-1" /> {location}
      </div>
      <p className="text-sm text-gray-700 mt-2">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <span
          className={`text-sm font-semibold ${
            price === "Free Entry" ? "text-blue-600" : "text-black"
          }`}
        >
          {price}
        </span>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>
      <div className="flex mt-4 gap-2">
        <button className="flex-1 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
          Register
        </button>
        <button className="w-9 h-9 border rounded-md text-lg">+</button>
      </div>
    </div>
  </div>
);

// Support Section
const SupportSection = () => {
  return (
    <section className="bg-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-2">Need Help Planning Your Cultural Journey?</h2>
      <p className="text-gray-600 mb-12">
        Our local experts are here to help you make the most of Ladakh's cultural events
      </p>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
        {/* 24/7 Support */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <Phone className="mx-auto text-blue-500 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
          <p className="text-gray-600 mb-4">
            Call us anytime for event information and bookings
          </p>
          <a
            href="tel:‪+919876543210‬"
            className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100 transition font-semibold"
          >
            <Phone size={16} /> ‪+91 98765 43210‬
          </a>
        </div>

        {/* Live Chat */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <MessageSquare className="mx-auto text-blue-500 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">
            Chat with our cultural experts instantly
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100 transition font-semibold">
            <MessageSquare size={16} /> Start Chat
          </button>
        </div>

        {/* Email Support */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <Mail className="mx-auto text-blue-500 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">
            Get detailed information via email
          </p>
          <a
            href="mailto:events@ladakhtravel.com"
            className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100 transition font-semibold"
          >
            <Mail size={16} /> events@ladakhtravel.com
          </a>
        </div>
      </div>
    </section>
  );
};

// Heritage Section
const HeritageSection = ({text, maxLength}: {text: string, maxLength: number}) => {
  return (
    <section className="bg-[#1D3B8B] text-white py-16 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Don't Miss Out on Ladakh's Cultural Heritage
      </h2>
      <p className="max-w-2xl mx-auto text-gray-200 mb-10">
        Register early for popular events, explore cultural packages, and immerse yourself in the authentic traditions of Ladakh.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl  mx-auto">
        <div className="bg-[#344C9C] rounded-md pt-4 p-8 flex flex-col items-center">
          <User className="h-10 w-10 mb-4" />
          <h3 className="font-bold text-lg mb-2">Early Registration</h3>
          <p className="text-gray-200 mb-4 text-sm text-center">
           {/* Book your spots for popular festivals in advance  */}
           {truncate(text, maxLength)}
          </p>
          <button className="bg-white text-black font-semibold px-4 py-2 rounded-md">
            Register Now
          </button>
        </div>
        

        <div className="bg-[#344C9C] rounded-md pt-4 p-8 flex flex-col items-center">
          <Star className="h-10 w-10 mb-4" />
          <h3 className="font-bold text-lg mb-2">Cultural Packages</h3>
          <p className="text-gray-200 mb-4 text-sm text-center">
            Explore curated cultural tour packages                            
            
 </p>
          <button className="bg-white text-black font-semibold px-4 py-2 rounded-md">
            Explore Tours
          </button>
        </div>

        <div className="bg-[#344C9C] rounded-md pt-4 p-8 flex flex-col items-center">
          <Users className="h-10 w-10 mb-4" />
          <h3 className="font-bold text-lg mb-2">Group Bookings</h3>
          <p className="text-gray-200 mb-4 text-sm text-center">
            Special rates for group cultural experiences

          </p>
          <button className="bg-white text-black font-semibold px-4 py-2 rounded-md">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default function CulturePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const text = "Book your spots for popular festivals in advance";
  const maxLength = 35; // Adjust as needed

  const eventsList: EventCardProps[] = [
    {
      image: "/images/event/cul-1.jpg",
      title: "Thiksey Gustor Festival",
      date: "Jun 20",
      location: "Thiksey Monastery",
      description: "Sacred mask dance festival at Thiksey Monastery",
      price: "Free Entry",
      duration: "2 Days",
    },
    {
      image: "/images/event/cul-2.jpg",
      title: "Sindhu Darshan Festival",
      date: "Jun 25",
      location: "Shey, Ladakh",
      description: "Celebration of River Indus with cultural programs",
      price: "₹ 500",
      duration: "2 Days",
    },
    {
      image: "/images/event/cul-3.jpg",
      title: "Phyang Tsedup Festival",
      date: "Jul 05",
      location: "Phyang Monastery",
      description: "Annual monastery festival with traditional performances",
      price: "Free Entry",
      duration: "2 Days",
    },
  ];

  const featuredFestivals = [
    {
      title: "Hemis Festival",
      date: "July 15, 2024",
      location: "Hemis Monastery, Ladakh",
      description:
        "The most famous festival of Ladakh, celebrating the birth anniversary of Guru Padmasambhava.",
      tags: ["Mask Performances", "Traditional Music"],
      image: "/images/event/event1.png",
    },
    {
      title: "Ladakh Festival",
      date: "Sep 01, 2024",
      location: "Leh, Ladakh",
      description:
        "Annual cultural festival showcasing Ladakhi traditions, crafts, and performances.",
      tags: ["Cultural Shows", "Local Crafts", "Traditional Food"],
      image: "/images/event/event2.png",
    },
    {
      title: "Losar Festival",
      date: "Dec 15, 2024",
      location: "Various Monasteries, Ladakh",
      description:
        "Tibetan New Year celebration with traditional ceremonies and festivities.",
      tags: ["New Year Rituals", "Community Feasts", "Traditional Dances"],
      image: "/images/event/event3.jpg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[url('/images/event/ladakh-event.jpg')] bg-cover bg-center h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            Discover Ladakh’s Cultural Treasures
          </h1>
          <p className="mb-6">Explore festivals, heritage events, and more</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center bg-white text-black px-4 py-2 rounded-md shadow">
              <FaSearch className="mr-2" />
              <input
                type="text"
                placeholder="Search events"
                className="outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {}}
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Featured Festivals */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Festivals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFestivals.map((fest, i) => (
            <div key={i} className="bg-white border shadow-md overflow-hidden">
              <div className="relative">
                <Image
                  src={fest.image}
                  alt={fest.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Featured
                </div>
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Religious
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{fest.title}</h3>
                <p className="text-sm text-gray-500">📅 {fest.date}</p>
                <p className="text-sm text-gray-500 mb-2">📍 {fest.location}</p>
                <p className="text-sm mb-2">{fest.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {fest.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button className="bg-blue-700 text-white text-sm px-4 py-2 rounded hover:bg-blue-800">
                    Learn More
                  </button>
                  <button>
                    <FaShareAlt className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Calendar */}
      <section className="bg-gray-50 py-15 px-4  "> 
        <h2 className="text-3xl font-bold text-center mb-10">Event Calendar</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {eventsList.map((ev, idx) => (
            <EventCard key={idx} {...ev} />
          ))}
        </div>
      </section>

      {/* Heritage CTA */}
      <HeritageSection text={text} maxLength={maxLength} />

      {/* Support Section */}
      <SupportSection />
        </div>
    );
}
