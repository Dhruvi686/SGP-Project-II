import React, { useState } from "react";
import Image from "next/image";
import Room01 from "../../../public/images/hotelguide/Room01.jpg";
import Room02 from "../../../public/images/hotelguide/Room02.jpg";
import Room03 from "../../../public/images/hotelguide/Rooom03.jpg";

const roomData = [
    {
        type: "Standard Room",
        description: "Comfortable room with mountain views and modern amenities.",
        features: ["Mountain View", "Free WiFi", "AC"],
        price: 500,
        available: true,
        image: Room02.src,
    },
    {
        type: "Deluxe Suite",
        description: "Spacious suite with separate living area and deluxe amenities.",
        features: ["Balcony", "Free WiFi", "AC", "Master Bedroom"],
        price: 650,
        available: true,
        image: Room01.src,
    },
    {
        type: "Presidential Suite",
        description: "Ultimate luxury with panoramic views and exclusive services.",
        features: ["Master Bedroom", "Free WiFi", "Private Terrace", "AC"],
        price: 1050,
        available: false,
        image: Room03.src,
    },
];
const filters = ["All Rooms", "Standard Room", "Deluxe Suite", "Presidential Suite"];

export default function RoomTypesPricing() {
    const [activeFilter, setActiveFilter] = useState("All Rooms");

    const filteredRooms =
        activeFilter === "All Rooms"
            ? roomData
            : roomData.filter((room) => room.type === activeFilter);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Room Types & Pricing</h2>
            <p className="text-center text-gray-600 mb-6">
                Choose from our selection of comfortable and luxurious accommodations
            </p>

            <div className="bg-gray-100 rounded-lg overflow-hidden mb-8">
                <div className="flex justify-around items-center">
                    {filters.map((filter) => (
                        <div key={filter} className="flex-1 text-center">
                            <button
                                className={`w-full py-2 text-sm md:text-base font-semibold transition ${activeFilter === filter
                                    ? "bg-[#0D2C54] text-white"
                                    : "text-black hover:bg-gray-200"
                                    }`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                    <div
                        key={room.type}
                        className="border rounded-lg shadow-sm overflow-hidden relative flex flex-col h-full"
                    >
                        <Image
                            src={room.image}
                            alt={room.type}
                            width={400}
                            height={250}
                            className="w-full object-cover"
                        />
                        <span
                            className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-full ${room.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                        >
                            {room.available ? "Available" : "Sold Out"}
                        </span>

                        <div className="flex flex-col justify-between flex-grow p-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2">{room.type}</h3>
                                <p className="text-gray-600 mb-4">{room.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {room.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs bg-gray-200 px-2 py-1 rounded"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <p className="text-lg font-semibold text-gray-800">
                                    ₹ {room.price}/night
                                </p>
                                <button
                                    className={`px-4 py-2 rounded bg-blue-600 text-white transition ${!room.available ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                                        }`}
                                    disabled={!room.available}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
