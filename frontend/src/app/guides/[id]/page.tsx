"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Calendar, MapPin, Shield, Award, MessageCircle } from "lucide-react";

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

export default function GuideProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const guide = guides.find(g => g.id === params.id);

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide not found</h1>
          <button
            onClick={() => router.back()}
            className="text-purple-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleBackToGuides = () => {
    router.push("/guides");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleBooking = () => {
    if (selectedDate) {
      // Here you would typically send the booking data to your backend
      alert(`Booking confirmed for ${guide.name} on ${selectedDate.toLocaleDateString()}`);
    } else {
      alert("Please select a date first");
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = currentMonth.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < today;
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(date)}
          disabled={isPast}
          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? "bg-purple-600 text-white"
              : isToday
              ? "bg-purple-100 text-purple-600"
              : isPast
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={handleBackToGuides}
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Guide Profile Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Guide Image */}
            <div className="lg:w-1/3">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-full h-80 lg:h-full object-cover"
              />
            </div>
            
            {/* Guide Info */}
            <div className="lg:w-2/3 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{guide.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {guide.specialization}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{guide.rating}</span>
                      <span className="text-gray-600">({guide.reviews?.length || 0} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{guide.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{guide.price}</div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {guide.description}
              </p>
            </div>
          </div>
        </div>

        {/* Specializations, Languages & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Specializations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Specializations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {guide.specializations?.map((spec, idx) => (
                <span
                  key={idx}
                  className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-100"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Experience */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Languages & Experience</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {guide.experience}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Reviews ({guide.reviews?.length || 0})</h3>
          </div>
          
          <div className="space-y-4">
            {guide.reviews?.map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Book Your Experience</h3>
          </div>
          
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-3 border border-gray-300 rounded-lg text-left hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {selectedDate ? selectedDate.toLocaleDateString() : "Choose a date"}
            </button>
            {showCalendar && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white shadow-lg">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {generateCalendarDays()}
                </div>
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Availability</h4>
            <div className="space-y-2">
              {["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"].map(day => (
                <div key={day} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                  <span className="text-gray-700 text-sm">{day}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Available</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Book Now - {guide.price}
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
              Contact Guide
            </button>
          </div>

          {/* Quick Info */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">Within 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cancellation</span>
                <span className="font-medium">Flexible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Group Size</span>
                <span className="font-medium">1-8 people</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}