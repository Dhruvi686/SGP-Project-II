"use client";

import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "The Hidden Gems of Nubra Valley",
    author: "Tenzin Dorjay",
    date: "June 5, 2024",
    readTime: "8 min read",
    description:
      "Discover the lesser-known attractions of Nubra Valley, from secret hot springs to ancient petroglyphs that few tourists ever see.",
    tag: "Travel guide",
    image: "/images/ladakhhero.jpeg",
  },
  {
    id: 2,
    title: "Photographing a Pangong Lake: A Complete Guide",
    author: "Diki Dolma",
    date: "May 28, 2024",
    readTime: "12 min read",
    description:
      "Learn the best techniques, locations, and times to capture the ever-changing colors of Pangong lake through your lens.",
    tag: "Photography",
    image: "/ladakh-hero.jpg",
  },
  {
    id: 3,
    title: "Ladakhi Cuisine: Beyond Momos and Thukpa",
    author: "Sonam Yangzom",
    date: "May 15, 2024",
    readTime: "10 min read",
    description:
      "Explore the rich culinary traditions of Ladakh, featuring ancient recipes and unique ingredients from the high-altitude desert.",
    tag: "Food and culture",
    image: "/handicrafts.jpg",
  },
  {
    id: 4,
    title: "Winter in Ladakh: The Road Less Traveled",
    author: "Rigzin Namgyal",
    date: "April 30, 2024",
    readTime: "15 min read",
    description:
      "Discover the magical winter landscape of Ladakh when tourists are few and the frozen rivers create a surreal wonderland.",
    tag: "Adventure",
    image: "/ladakh-bridge2.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white pt-40 md:pt-52 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Ladakh Tourism Blog</h1>
          <p className="text-lg mb-6">
            Discover stories, guides, and insights about Ladakh’s breathing landscapes,
            rich culture, and unique experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="#articles">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded font-semibold flex items-center gap-2 transition">
                🔍 Show articles
              </button>
            </Link>
            <Link href="/categories">
              <button className="border border-white px-6 py-3 rounded text-white hover:bg-white hover:text-blue-900 font-semibold transition">
                Browse Categories
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <section id="articles" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Latest Articles</h2>

        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 w-full h-56 md:h-auto">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-2 md:w-2/3">
                <span className="inline-block bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded w-fit uppercase">
                  {article.tag}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">{article.title}</h3>
                <div className="text-sm text-gray-500 flex flex-wrap gap-2 mb-2">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <p className="text-gray-700">{article.description}</p>
                <Link href="#" className="text-indigo-600 font-semibold mt-2 hover:underline flex items-center gap-1 w-fit">
                  Read more <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">
              Load More Article
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-10">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-3">
            {["All Categories", "Travel guide", "Photography", "Food & culture", "Adventure", "Eco-Tourism"].map((cat) => (
              <button
                key={cat}
                className={`${
                  cat === "All Categories"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } px-4 py-1 rounded-full text-sm`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Videos */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Featured videos</h3>
            <div className="space-y-4">
              {[
                { src: "/images/tripPlan/trip-plan.jpg", title: "Journey Through Ladakh: A Visual Odyssey", duration: "12:05" },
                { src: "/transport.jpg", title: "Riding the Highest Roads: Khardung La Pass", duration: "07:17" },
                { src: "/images/localguide/local1.jpg", title: "Monastic Life in Ladakh: A Day with the Monks", duration: "12:55" },
              ].map((video) => (
                <div className="flex items-center gap-4" key={video.title}>
                  <div className="relative w-28 h-16 bg-gray-200 rounded">
                    <img src={video.src} alt="" className="absolute inset-0 w-full h-full object-cover rounded" />
                    <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-sm">{video.title}</p>
                </div>
              ))}
            </div>
            <Link href="#" className="block mt-4 text-indigo-600 hover:underline text-sm">
              View all videos →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-50 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-4">Get the latest articles, travel tips, and updates delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded border w-full sm:w-2/3"
            />
            <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition">Subscribe</button>
          </div>
        </div>
      </section>


    </main>
  );
}
