import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Building, Plane, Train } from "lucide-react";
import Map from '../../../public/images/hotelguide/map.jpg'

const attractions = [
    {
        name: "Aspen Mountain",
        description: "Popular destination",
        rating: 4.8,
        reviews: 2341,
        distance: "1.2 km",
        category: "Mountain",
    },
    {
        name: "Silver Queen Gondola",
        description: "Scenic ride",
        rating: 4.6,
        reviews: 1876,
        distance: "0.8 km",
        category: "Activities",
    },
];

const transportation = [
    {
        icon: <Building className="text-blue-600 w-5 h-5" />,
        name: "City Center",
        description: "Downtown Aspen",
        time: "8 min",
        distance: "2.5 km",
    },
    {
        icon: <Plane className="text-blue-600 w-5 h-5" />,
        name: "Aspen Airport",
        description: "Pitkin County Airport",
        time: "15 min",
        distance: "8.2 km",
    },
    {
        icon: <Train className="text-blue-600 w-5 h-5" />,
        name: "Train Station",
        description: "Glenwood Springs",
        time: "45 min",
        distance: "65 km",
    },
];

const localAreaStats = [
    { value: "15+", label: "Restaurants" },
    { value: "8", label: "Shopping Centers" },
    { value: "12", label: "Entertainment" },
    { value: "5", label: "Parks" },
];

const filters = ["All", "Mountain", "Activities", "Landmarks"];

export default function LocationAccessibility() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredAttractions = attractions.filter((a) => {
        return (
            (filter === "All" || a.category === filter) &&
            a.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="p-6 space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Location & Accessibility</h1>
                <p className="text-gray-500 text-lg">
                    Perfectly positioned for your convenience and exploration
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <img
                        src={Map.src}
                        alt="Map"
                        className="w-full rounded-xl shadow-lg"
                    />
                </div>

                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold">Nearby Attractions</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Discover amazing places around you
                    </p>

                    <Input
                        placeholder="Search attractions..."
                        className="mb-4 shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="flex flex-wrap gap-2 mb-4">
                        {filters.map((f) => (
                            <Button
                                key={f}
                                variant={filter === f ? "default" : "outline"}
                                onClick={() => setFilter(f)}
                                className="text-sm rounded-full px-4 cursor-pointer"
                            >
                                {f}
                            </Button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {filteredAttractions.map((attr, index) => (
                            <Card
                                key={index}
                                className="flex justify-between items-center border hover:shadow-md transition"
                            >
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg">{attr.name}</h3>
                                    <p className="text-gray-500 text-sm">{attr.description}</p>
                                    <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(attr.rating) ? "fill-yellow-500" : ""
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-gray-600">
                                            {attr.rating} ({attr.reviews.toLocaleString()})
                                        </span>
                                    </div>
                                </CardContent>
                                <div className="px-4 py-2 text-white bg-blue-700 font-medium rounded-lg m-4">
                                    {attr.distance}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mt-10">
                <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Transportation</h3>
                    <div className="space-y-4">
                        {transportation.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border rounded-md p-3 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-md">{item.icon}</div>
                                    <div>
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="font-semibold">{item.time}</p>
                                    <p className="text-gray-500">{item.distance}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Local Area</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {localAreaStats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-md p-4 text-center shadow-sm"
                            >
                                <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
