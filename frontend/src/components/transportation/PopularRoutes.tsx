const routes = [
  {
    title: "Leh to Nubra Valley",
    distance: "120 km",
    duration: "4–5 Hours",
    highlights: ["Khardung la pass", "Sand dunes"],
    image: "images/transport/routes1.png",
  },
  {
    title: "Leh to Pangong Lake",
    distance: "160 km",
    duration: "5–6 Hours",
    highlights: ["Chang la pass", "Shey Palace"],
    image: "images/transport/routes2.png",
  },
  {
    title: "Manali to Leh",
    distance: "480 km",
    duration: "2 days",
    highlights: ["Moore Plains", "Tanglang La"],
    image: "images/transport/routes3.png",
  },
  {
    title: "Srinagar to Leh",
    distance: "420 km",
    duration: "2 days",
    highlights: ["Sonamarg", "Zoji La Pass"],
    image: "images/transport/routes4.png",
  },
  {
    title: "Leh to Tso Moriri",
    distance: "220 km",
    duration: "7–8 Hours",
    highlights: ["Nomadic Settlements", "Wildlife"],
    image: "images/transport/routes5.png",
  },
  {
    title: "Leh to Zanskar Valley",
    distance: "450 km",
    duration: "2 Days",
    highlights: ["Penzi La pass", "Drang-Drung glacier"],
    image: "images/transport/routes6.png",
  },
];

const PopularRoutes = () => (
  <section className="py-12 px-4 bg-white">
    <h2 className="text-2xl font-bold text-center mb-2">Popular Routes</h2>
    <p className="text-center text-gray-600 mb-8">
      Discover the most scenic and popular journey in Ladakh
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {routes.map((route, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition"
        >
          <div className="relative">
            <img
              src={route.image}
              alt={route.title}
              className="w-full h-36 object-cover"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded">
              {route.title}
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <div>
                <span className="block font-medium text-black">Distance</span>
                {route.distance}
              </div>
              <div>
                <span className="block font-medium text-black">Duration</span>
                {route.duration}
              </div>
            </div>

            <div className="mb-3">
              <span className="block font-medium text-black text-sm mb-1">
                Highlight
              </span>
              <div className="flex flex-wrap gap-2">
                {route.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs border rounded px-2 py-1 text-gray-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-2 w-full bg-blue-900 text-white text-sm py-2 rounded-md hover:bg-blue-800 transition">
              View Route Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PopularRoutes;
