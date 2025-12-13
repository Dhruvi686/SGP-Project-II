"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Users } from "lucide-react";
import Image from "next/image";
import HotelG from "../../../public/images/hotelguide/hotel-bg.jpg";
import HotelOverview from "@/components/hotel-guide/HotelOverView";
import PhotoGallery from "@/components/hotel-guide/PhotoGallery";
import RoomTypesPricing from "@/components/hotel-guide/RoomData";
import LocationAccessibility from "@/components/hotel-guide/LocationAccessibility";
import GuestReviews from "@/components/hotel-guide/GuestReview";
import GetInTouch from "@/components/hotel-guide/GetInTouch";

export default function HotelGuide() {
    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-[90vh] overflow-hidden">
                <Image
                    src={HotelG}
                    alt="Grand Mountain Resort"
                    fill
                    className="object-cover z-0"
                />

                <div className="absolute inset-0 bg-black/40 z-10" />

                <div className="absolute z-20 text-white inset-0 flex items-center">
                    <div className="max-w-6xl mx-auto px-4 w-full">
                        <div className="max-w-2xl">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                                    Verified Stay
                                </span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                                    Top Rated
                                </span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                                    Luxury
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                Grand Mountain Resort & Spa
                            </h1>

                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(4)].map((_, i) => (
                                        <Star key={i} className="fill-yellow-400 w-5 h-5" />
                                    ))}
                                    <Star className="w-5 h-5" />
                                </div>
                                <p className="text-white text-lg font-medium">
                                    4.8 <span className="text-sm">(1247 reviews)</span>
                                </p>
                            </div>

                            <div className="flex items-center text-white mb-4">
                                <MapPin className="w-4 h-4 mr-2" />
                                <p className="text-sm">2.5 km from city center</p>
                            </div>

                            <div className="text-white text-2xl font-bold mb-8">
                                ₹ 2,999 <span className="text-sm font-normal">per night</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3">
                                    Book Now
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-6 py-3">
                                    Check Availability
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Banner Section */}
            <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg border-t border-gray-200">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                </div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                            {/* Check-in */}
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md border border-white/20">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Check-in</p>
                                    <p className="font-semibold text-gray-800">Today</p>
                                </div>
                            </div>

                            {/* Check-out */}
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md border border-white/20">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Check-out</p>
                                    <p className="font-semibold text-gray-800">Tomorrow</p>
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md border border-white/20">
                                <Users className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Guests</p>
                                    <p className="font-semibold text-gray-800">2 Guests</p>
                                </div>
                            </div>
                        </div>

                        {/* Modify Search Button */}
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                            Modify Search
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="max-w-6xl mx-auto">
                <HotelOverview />
                <PhotoGallery />
                <RoomTypesPricing />
                <LocationAccessibility />
                <GuestReviews />
                <GetInTouch />
            </div>
        </main>
    )
}
