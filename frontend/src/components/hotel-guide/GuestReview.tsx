'use client';

import { useState } from 'react';

type Review = {
    name: string;
    date: string;
    rating: number;
    content: string;
};

const reviewData: Review[] = [
    {
        name: 'Priya Sharma',
        date: '2024-03-15',
        rating: 5,
        content:
            'Absolutely mesmerizing journey through the mystical landscapes of Ladakh! The snow-capped peaks, pristine lakes, and ancient monasteries created memories that will last a lifetime. Our guide was knowledgeable and the accommodation exceeded expectations. The entire experience was perfectly organized from start to finish.',
    },
    {
        name: 'Arjun Singh',
        date: '2024-01-30',
        rating: 5,
        content:
            'Amazing landscapes and well-organized itinerary! The monasteries were peaceful and the local culture immersion was authentic. The adventure activities like river rafting were thrilling. Only suggestion would be to include more time for acclimatization, especially for first-time high-altitude travelers.',
    },
    {
        name: 'Kavita Rao',
        date: '2024-05-02',
        rating: 4,
        content:
            'Good experience overall. The guide was polite and supportive. Accommodation could have been slightly better.',
    },
];

const RatingBar = ({ stars, percentage }: { stars: number; percentage: number }) => (
    <div className="flex items-center gap-2 text-sm">
        <span>{stars}★</span>
        <div className="h-2 w-40 bg-gray-200 rounded">
            <div
                className="h-2 bg-yellow-400 rounded"
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

export default function GuestReviewsPage() {
    const [filter, setFilter] = useState('All');

    const sortedReviews = () => {
        switch (filter) {
            case 'Most Recent':
                return [...reviewData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            case 'Highest Rated':
                return [...reviewData].sort((a, b) => b.rating - a.rating);
            default:
                return reviewData;
        }
    };

    const displayedReviews = sortedReviews();

    return (
        <div className="bg-[#0B2A4A] text-white p-10 min-h-screen flex justify-center items-start">
            <div className="bg-white text-black rounded-md shadow-md w-full max-w-6xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left */}
                <div className="col-span-1 bg-[#0B2A4A] text-white rounded-md p-6 flex flex-col items-center text-center space-y-4">
                    <div className="bg-[#0B2A4A] text-white rounded-md p-6 flex flex-col items-center text-center">
                        <p className="text-4xl font-bold">4.8</p>
                        <div className="flex gap-1 justify-center mt-1">
                            {'★★★★★'.split('').map((_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                        <p className="text-sm mt-1">Based on 127 reviews</p>
                    </div>

                    <div>
                        <div className="space-y-2">
                            <RatingBar stars={5} percentage={90} />
                            <RatingBar stars={4} percentage={70} />
                            <RatingBar stars={3} percentage={40} />
                            <RatingBar stars={2} percentage={20} />
                            <RatingBar stars={1} percentage={10} />
                        </div>

                        <div className="text-sm space-y-1 pt-2">
                            <p className="flex justify-between"><span>Scenic Beauty</span> <span className="font-bold">4.9</span></p>
                            <p className="flex justify-between"><span>Adventure</span> <span className="font-bold">4.8</span></p>
                            <p className="flex justify-between"><span>Accommodation</span> <span className="font-bold">4.7</span></p>
                            <p className="flex justify-between"><span>Food & Service</span> <span className="font-bold">4.6</span></p>
                            <p className="flex justify-between"><span>Value for Money</span> <span className="font-bold">4.8</span></p>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-[#0B2A4A]">Guest Reviews</h2>

                    <div className="flex gap-2">
                        {['All', 'Most Recent', 'Highest Rated'].map((f) => (
                            <button
                                key={f}
                                className={`px-4 py-1 rounded-md border text-sm ${filter === f ? 'bg-[#0B2A4A] text-white' : 'border-gray-400 text-black'
                                    }`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {displayedReviews.map((review, idx) => (
                        <div key={idx} className="border rounded-md p-4 shadow-sm border-blue-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{review.name}</p>
                                    <p className="text-sm text-gray-500">{new Date(review.date).toDateString()}</p>
                                </div>
                                <div className="flex text-yellow-500">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </div>
                            </div>
                            <p className="mt-2 text-sm">{review.content}</p>
                            <button className="mt-3 cursor-pointer px-3 py-1 bg-gray-100 border rounded shadow text-sm hover:bg-gray-200">
                                Helpful stay
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
