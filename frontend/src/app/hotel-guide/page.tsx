'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
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
        <>
            <div className="relative w-full h-[90vh]">
                <Image
                    src={HotelG}
                    alt="Grand Mountain Resort"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />

                <div className="absolute inset-0 bg-black/50 z-10" />

                <div className="absolute z-20 text-white top-28 left-12 max-w-3xl">
                    <div className="flex gap-2 mb-4">
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

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Grand Mountain Resort & Spa
                    </h1>

                    <div className="flex items-center mt-4 space-x-2">
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

                    <div className="flex items-center text-white mt-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <p className="text-sm">2.5 km from city center</p>
                    </div>

                    <div className="text-white text-2xl font-bold mt-4">
                        ₹ 299 <span className="text-sm font-normal">per night</span>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                            Book Now
                        </Button>
                        <Button variant="default" className="font-semibold">
                            Check Availability
                        </Button>
                    </div>
                </div>
            </div>
            <HotelOverview />
            <PhotoGallery />
            <RoomTypesPricing />
            <LocationAccessibility />
            <GuestReviews />
            <GetInTouch />
        </>
    )
}