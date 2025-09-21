"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { articlesData, videosData, categoriesData, Article } from "./data";

const HeroSection = () => (
  <section className="bg-blue-900 text-white pt-40 md:pt-52 pb-12 px-4">
    <div className="max-w-6xl mx-auto text-center md:text-left">
      <h1 className="text-2xl md:text-3xl font-bold mb-3">Ladakh Tourism Blog</h1>
      <p className="text-lg mb-6">
        Discover stories, guides, and insights about Ladakh’s breathtaking landscapes,
        rich culture, and unique experiences.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link href="#articles" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded font-semibold flex items-center gap-2 transition">
          🔍 Show articles
        </Link>
        <Link href="/categories" className="border border-white px-6 py-3 rounded text-white hover:bg-white hover:text-blue-900 font-semibold transition">
          Browse Categories
        </Link>
      </div>
    </div>
  </section>
);

const ArticleCard = ({ article }: { article: Article }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden flex flex-col md:flex-row">
    <div className="relative md:w-1/3 w-full h-56 md:h-auto">
      <Image src={article.image} alt={article.title} layout="fill" className="object-cover" />
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
      <Link href={`/tours/${article.id}`} className="text-indigo-600 font-semibold mt-2 hover:underline flex items-center gap-1 w-fit">
        Read more <span aria-hidden="true">→</span>
      </Link>
    </div>
  </div>
);

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>(articlesData);
  const [activeCategory, setActiveCategory] = useState("All Categories");

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Article Section */}
      <section id="articles" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Latest Articles</h2>

        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
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
              aria-label="Search articles"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-3">
            {categoriesData.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${
                  activeCategory === cat
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
              {videosData.map((video) => (
                <div className="flex items-center gap-4" key={video.title}>
                  <div className="relative w-28 h-16 bg-gray-200 rounded shrink-0">
                    <Image src={video.src} alt={video.title} layout="fill" className="object-cover rounded" />
                    <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <Link href="#" className="text-sm hover:underline">
                    {video.title}
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/videos" className="block mt-4 text-indigo-600 hover:underline text-sm">
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
              aria-label="Email address for newsletter"
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
