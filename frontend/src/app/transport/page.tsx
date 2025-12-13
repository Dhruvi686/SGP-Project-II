"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import FeaturedVehicles from "@/components/transportation/FeaturedVehicles";
import PopularRoutes from "@/components/transportation/PopularRoutes";
import SafetyTips from "@/components/transportation/SafetyTips";
import TransportOptions from "@/components/transportation/TransportOption";

export default function TransportPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Transport Services in Ladakh</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Safe, reliable, and government-verified transport options for your Ladakh adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Search className="w-5 h-5" />
                Find Transport
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105">
                View Popular Routes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Options Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Transport Options</h2>
          <TransportOptions />
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FeaturedVehicles />
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <PopularRoutes />
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SafetyTips />
        </div>
      </section>
    </main>
  );
}