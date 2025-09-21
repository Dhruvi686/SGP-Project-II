export default function HeroSection() {
  return (
    <section className="bg-purple-800 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Local Guides & Authentic Experiences
        </h1>
        <p className="max-w-2xl mx-auto text-xl mb-8 text-purple-100">
          Connect with certified local guides and immerse yourself in the culture,
          adventure, and beauty of Ladakh.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find a Guide
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Browse Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
