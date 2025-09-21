"use client";

import GuideCard from "./GuideCard";
import { useRouter } from "next/navigation";

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
    price: "$75/day",
    description: "With over 15 years of experience as a certified cultural guide, Diskit specializes in Ladakhi Buddhist heritage and ancient monastery tours. Born and raised in Leh, she provides authentic insights into Ladakhi culture, history, and spiritual practices.",
    specializations: ["Buddhist Heritage", "Ancient Monasteries", "Traditional Crafts", "Cultural Tours"],
    certifications: ["Government Licensed Guide", "Cultural Heritage Specialist", "First Aid Certified"],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely amazing experience! Diskit's knowledge of Ladakhi culture is incredible and her passion really shows.",
        date: "2 weeks ago"
      },
      {
        name: "David Brown",
        rating: 5,
        comment: "Professional, knowledgeable, and made our trip unforgettable. Highly recommend!",
        date: "1 month ago"
      },
      {
        name: "Emma Wilson",
        rating: 4,
        comment: "Great guide with deep cultural insights. The monastery tour was fascinating.",
        date: "2 months ago"
      }
    ]
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
    price: "$89/day",
    description: "A seasoned trekking guide with 12+ years of experience in the high-altitude regions of Ladakh. Rigzin specializes in challenging treks, mountaineering expeditions, and adventure tourism while ensuring safety and environmental conservation.",
    specializations: ["High Altitude Trekking", "Mountaineering", "Adventure Tourism", "Wildlife Tracking"],
    certifications: ["UIAA Certified Guide", "Wilderness First Responder", "Environmental Conservation Specialist"],
    reviews: [
      {
        name: "Michael Chen",
        rating: 5,
        comment: "Rigzin made our trek through the mountains absolutely incredible. His knowledge of the terrain and safety protocols is outstanding.",
        date: "1 week ago"
      },
      {
        name: "Lisa Rodriguez",
        rating: 4,
        comment: "Great adventure guide! He knows all the best spots and keeps everyone safe.",
        date: "3 weeks ago"
      },
      {
        name: "James Thompson",
        rating: 5,
        comment: "Professional, experienced, and passionate about the mountains. Couldn't ask for a better guide.",
        date: "1 month ago"
      }
    ]
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
    price: "$65/day",
    description: "A passionate photographer and nature guide with 8+ years of experience capturing the stunning landscapes of Ladakh. Tenzin specializes in wildlife photography, landscape photography, and nature conservation tours.",
    specializations: ["Wildlife Photography", "Landscape Photography", "Nature Conservation", "Bird Watching"],
    certifications: ["Professional Photographer", "Wildlife Conservationist", "Nature Guide Certified"],
    reviews: [
      {
        name: "Alexandra Park",
        rating: 5,
        comment: "Tenzin's photography skills and knowledge of wildlife made our tour exceptional. Got amazing shots!",
        date: "1 week ago"
      },
      {
        name: "Robert Kim",
        rating: 5,
        comment: "Incredible guide for photography enthusiasts. Knows all the perfect spots and timing.",
        date: "2 weeks ago"
      },
      {
        name: "Maria Garcia",
        rating: 4,
        comment: "Great experience learning about Ladakh's wildlife and photography techniques.",
        date: "1 month ago"
      }
    ]
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
    price: "$82/day",
    description: "A dedicated wildlife biologist and guide with 10+ years of experience studying Ladakh's unique ecosystem. Sonam specializes in wildlife safaris, bird watching, and ecological conservation tours.",
    specializations: ["Wildlife Safaris", "Bird Watching", "Ecological Conservation", "Snow Leopard Tracking"],
    certifications: ["Wildlife Biologist", "Bird Guide Specialist", "Conservation Expert"],
    reviews: [
      {
        name: "Thomas Anderson",
        rating: 5,
        comment: "Sonam's expertise in wildlife is unmatched. We spotted rare birds and learned so much about conservation.",
        date: "1 week ago"
      },
      {
        name: "Jennifer Lee",
        rating: 4,
        comment: "Amazing wildlife guide with deep knowledge of the local ecosystem.",
        date: "2 weeks ago"
      },
      {
        name: "Carlos Mendez",
        rating: 5,
        comment: "Professional and passionate about wildlife conservation. Highly recommended!",
        date: "1 month ago"
      }
    ]
  },
];

export default function GuideSection() {
  const router = useRouter();

  const handleViewAllGuides = () => {
    router.push("/guides");
  };

  return (
    <>
      {/* Guide Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certified Local Guides
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Connect with experienced, government-verified guides who know Ladakh
              like the back of their hand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guides.map((guide, idx) => (
              <GuideCard key={idx} guide={guide} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleViewAllGuides}
              className="inline-flex items-center gap-2 text-purple-600 font-semibold text-lg hover:underline"
            >
              View All Guides
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Experience Category Section – Bottom 2×2 Grid with Highlighted Cards */}
      <section className="bg-white py-16 px-6">
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
      </section>
    </>
  );
}
