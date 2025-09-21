import React from "react";
import { Button } from "@/components/ui/button";
import {
    Wifi,
    PawPrint,
    Dumbbell,
    Utensils,
    ConciergeBell,
    ParkingSquare,
    CalendarDays,
    Users,
} from "lucide-react";
import { FaSwimmingPool } from "react-icons/fa";

interface AmenityProps {
    icon: React.ReactNode;
    label: string;
}

interface FeatureCardProps {
    title: string;
    description: string;
}

const HotelOverview: React.FC = () => {
    return (
        <div className="w-full bg-white py-10 px-4 sm:px-10 border-t border-b shadow-sm">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5" />
                        Check-in: Today
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5" />
                        Check-out: Tomorrow
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        2 Guests
                    </div>
                    <Button
                        variant="outline"
                        className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-4 py-2 rounded-md"
                    >
                        Modify Search
                    </Button>
                </div>

                <h2 className="text-3xl font-bold text-center mb-3">Hotel Overview</h2>
                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
                    Experience luxury and comfort at Grand Mountain Resort & Spa, nestled
                    in the heart of the Rocky Mountains with breathtaking views and
                    world-class amenities.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 justify-center mb-12">
                    <Amenity icon={<Wifi className="w-6 h-6" />} label="Free WiFi" />
                    <Amenity
                        icon={<FaSwimmingPool className="w-6 h-6" />}
                        label="Swimming Pool"
                    />
                    <Amenity icon={<PawPrint className="w-6 h-6" />} label="Pet Friendly" />
                    <Amenity icon={<Dumbbell className="w-6 h-6" />} label="Fitness Center" />
                    <Amenity icon={<Utensils className="w-6 h-6" />} label="Restaurant" />
                    <Amenity
                        icon={<ConciergeBell className="w-6 h-6" />}
                        label="Room Service"
                    />
                    <Amenity
                        icon={<ParkingSquare className="w-6 h-6" />}
                        label="Parking"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Prime Location"
                        description="Nestled in the heart of the mountains with easy access to major attractions and transportation hubs."
                    />
                    <FeatureCard
                        title="Luxury Amenities"
                        description="World-class spa, fitness center, fine dining restaurant, and premium room service available 24/7."
                    />
                    <FeatureCard
                        title="Exceptional Service"
                        description="Our dedicated staff ensures every guest receives personalized attention and memorable experiences."
                    />
                </div>
            </div>
        </div>
    );
};

const Amenity: React.FC<AmenityProps> = ({ icon, label }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md text-center">
            {icon}
            <span className="text-sm mt-2 font-medium">{label}</span>
        </div>
    );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default HotelOverview
