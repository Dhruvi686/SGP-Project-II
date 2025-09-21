"use client"

import React, { useState } from "react";
import Image from "next/image";
import PhotoGallery01 from "../../../public/images/hotelguide/photoGallery01.png";
import PhotoGallery02 from "../../../public/images/hotelguide/photoGallery02.png";
import PhotoGallery03 from "../../../public/images/hotelguide/photoGallery03.png";
import PhotoGallery04 from "../../../public/images/hotelguide/photoGallery04.png";
import PhotoGallery05 from "../../../public/images/hotelguide/photoGallery05.png";

const images = [
    PhotoGallery01,
    PhotoGallery02,
    PhotoGallery03,
    PhotoGallery04,
    PhotoGallery05,
    PhotoGallery01,
    PhotoGallery02,
    PhotoGallery03,
    PhotoGallery04,
];

const PhotoGallery = () => {
    const initialCount = 3;
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const handleToggle = () => {
        if (visibleCount === initialCount) {
            setVisibleCount(images.length)
        } else {
            setVisibleCount(initialCount)
        }
    };

    const visibleImages = images.slice(0, visibleCount);

    return (
        <div className="text-center py-10 px-4">
            <h2 className="text-4xl font-bold mb-2">Photo Gallery</h2>
            <p className="text-gray-500 mb-6">
                Explore our beautiful spaces and amenities
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto">
                <div className="sm:col-span-2 row-span-2 h-[380px]">
                    <Image
                        src={visibleImages[0]}
                        alt="Main"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {visibleImages.slice(1).map((src, index) => (
                    <div key={index} className="h-[180px]">
                        <Image
                            src={src}
                            alt={`Gallery ${index + 2}`}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={handleToggle}
                className="mt-6 bg-[#0a2540] text-white font-semibold px-6 py-3 rounded-md text-lg"
            >
                {visibleCount === initialCount
                    ? `View All 6 Photos`
                    : "Show Less"}
            </button>
        </div>
    );
};

export default PhotoGallery;
