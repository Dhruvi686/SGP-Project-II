"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Star, MapPin } from "lucide-react";

// Import the guides data
const guides = [
  {
    id: "diskit-dolma",
    name: "Diskit Dolma",
    image: "/images/localguide/local1.jpg",
    specialization: "Cultural & Historical",
    experience: "15+ years",
    languages: ["English", "Hindi", "Ladakhi"],
    rating: 4.9,
    location: "Leh, Ladakh",
    description: "With over 15 years of experience as a certified cultural guide, Diskit specializes in Ladakhi Buddhist heritage and ancient monastery tours.",
    specializations: ["Buddhist Heritage", "Ancient Monasteries", "Traditional Crafts", "Cultural Tours"],
  },
  {
    id: "rigzin-namgyal",
    name: "Rigzin Namgyal",
    image: "/images/localguide/local2.jpg",
    specialization: "Trekking & Adventure",
    experience: "12+ years",
    languages: ["English", "Hindi", "Ladakhi", "French"],
    rating: 4.7,
    location: "Nubra Valley, Ladakh",
    description: "A seasoned trekking guide with 12+ years of experience in the high-altitude regions of Ladakh.",
    specializations: ["High Altitude Trekking", "Mountaineering", "Adventure Tourism", "Wildlife Tracking"],
  },
  {
    id: "tenzin-norbu",
    name: "Tenzin Norbu",
    image: "/images/localguide/local3.jpg",
    specialization: "Photography & Nature",
    experience: "8+ years",
    languages: ["English", "Hindi", "Ladakhi"],
    rating: 4.9,
    location: "Pangong Lake, Ladakh",
    description: "A passionate photographer and nature guide with 8+ years of experience capturing the stunning landscapes of Ladakh.",
    specializations: ["Wildlife Photography", "Landscape Photography", "Nature Conservation", "Bird Watching"],
  },
  {
    id: "sonam-angmo",
    name: "Sonam Angmo",
    image: "/images/localguide/local4.jpg",
    specialization: "Wildlife & Ecology",
    experience: "10+ years",
    languages: ["English", "Hindi", "Ladakhi", "French"],
    rating: 4.7,
    location: "Hemis National Park, Ladakh",
    description: "A dedicated wildlife biologist and guide with 10+ years of experience studying Ladakh's unique ecosystem.",
    specializations: ["Wildlife Safaris", "Bird Watching", "Ecological Conservation", "Snow Leopard Tracking"],
  },
];

const specializations = [
  "All",
  "Cultural & Historical",
  "Trekking & Adventure", 
  "Photography & Nature",
  "Wildlife & Ecology"
];

export default function GuidesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === "All" || 
                                 guide.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const handleGuideClick = (guideId: string) => {
    router.push(`/guides/${guideId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Purple Background */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-40 md:pt-52 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Local Guides & Authentic Experiences
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with certified local guides and immerse yourself in the culture, adventure, and beauty of Ladakh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Find a Guide
            </button>
            <button className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Experiences
            </button>
          </div>
        </div>
      </div>

      {/* Content Section - White Background */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Certified Local Guides</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with experienced, government-verified guides who know Ladakh like the back of their hand.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Specialization Filter */}
            <div>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredGuides.length} of {guides.length} guides
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => handleGuideClick(guide.id)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-48 w-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{guide.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{guide.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{guide.location}</span>
                </div>
                
                <div className="mb-3">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {guide.specialization}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {guide.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.languages.slice(0, 3).map((lang, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                  {guide.languages.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      +{guide.languages.length - 3} more
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Experience Category Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Category</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Adventure */}
          <div className="bg-white rounded-lg shadow border-2 border-blue-500 p-6 text-center">
            <div className="flex justify-center items-center mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20h18L12 4 3 20z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Adventure</h3>
            <p className="text-gray-600 text-sm mb-4">
              Trekking, mountaineering, and outdoor activities
            </p>
            <button className="border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 text-sm font-medium">
              Explore Adventure
            </button>
          </div>

          {/* Photography */}
          <div className="bg-white rounded-lg shadow border-2 border-purple-500 p-6 text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-10 h-10 text-purple-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm9-2h-2.586l-1.707-1.707A1 1 0 0016.586 5H7.414a1 1 0 00-.707.293L5 7H3a1 1 0 00-1 1v11a2 2 0 002 2h16a2 2 0 002-2V8a1 1 0 00-1-1zm-9 10a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Photography</h3>
            <p className="text-gray-600 text-sm mb-4">
              Guided photo tours to scenic locations
            </p>
            <button className="border border-purple-500 text-purple-600 px-4 py-2 rounded hover:bg-purple-50 text-sm font-medium">
              Explore Photography
            </button>
          </div>

          {/* Cultural */}
          <div className="bg-white rounded-lg shadow border-2 border-orange-500 p-6 text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-10 h-10 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 3.25 2.33 6.28 5.5 11.5l1.5 2.5 1.5-2.5C16.67 15.28 19 12.25 19 9c0-3.87-3.13-7-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Cultural</h3>
            <p className="text-gray-600 text-sm mb-4">
              Monastery visits and cultural immersion
            </p>
            <button className="border border-orange-500 text-orange-600 px-4 py-2 rounded hover:bg-orange-50 text-sm font-medium">
              Explore Cultural
            </button>
          </div>

          {/* Culinary */}
          <div className="bg-white rounded-lg shadow border-2 border-green-500 p-6 text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-10 h-10 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2c0 .55.45 1 1 1h1v9a1 1 0 102 0V3h1a1 1 0 001-1V1H7v1zm10 0v9a1 1 0 102 0V6h1a1 1 0 001-1V1h-4zM3 14a1 1 0 011-1h16a1 1 0 011 1v2a3 3 0 01-3 3v3a1 1 0 11-2 0v-3H8v3a1 1 0 11-2 0v-3a3 3 0 01-3-3v-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Culinary</h3>
            <p className="text-gray-600 text-sm mb-4">
              Food tours and cooking classes
            </p>
            <button className="border border-green-500 text-green-600 px-4 py-2 rounded hover:bg-green-50 text-sm font-medium">
              Explore Culinary
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}
