type Vehicle = {
  name: string;
  price: string;
  image: string;
  passengers: string;
  features: string[];
};

const vehicles: Vehicle[] = [
  {
    name: "Toyota Innova Crysta",
    price: "₹5,500 /Day",
    image: "images/transport/vehicals1.png",
    passengers: "6 passengers",
    features: [
      "4x4 Drive",
      "Air Conditioning",
      "Experienced driver",
      "+1 more",
    ],
  },
  {
    name: "Royal Enfield Himalayan",
    price: "₹1,800 /Day",
    image: "images/transport/vehicals2.png",
    passengers: "1–2 passengers",
    features: ["411cc Engine", "Luggage Rack", "Helmet Included", "+1 more"],
  },
  {
    name: "Tempo Traveler",
    price: "₹8,000 /Day",
    image: "images/transport/vehicals3.jpg",
    passengers: "12 passengers",
    features: [
      "Spacious Seating",
      "Luggage Space",
      "Experienced driver",
      "+1 more",
    ],
  },
];

const FeaturedVehicles = () => (
  <section className="bg-gray-100 py-12">
    <h2 className="text-3xl font-bold text-center text-slate-800">
      Featured Vehicles
    </h2>
    <p className="text-center text-gray-600 mt-2 mb-8">
      Top-rated vehicles with experienced drivers for your Ladakh journey
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {vehicles.map((v) => (
        <div
          key={v.name}
          className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all"
        >
          <img
            src={v.image}
            alt={v.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="p-4 text-left">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{v.name}</h3>
              <div className="text-green-600 font-medium text-sm">
                <span className="text-black  px-4">From</span> <br /> {v.price}
              </div>
            </div>
            <p className="text-sm text-black mt-1">{v.passengers}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {v.features.map((f) => (
                <span
                  key={f}
                  className="border-2 border-black px-2  text-xs rounded-xs text-black"
                >
                  {f}
                </span>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition">
              Book Now →
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-8">
      <button className="border-2 border-green-600 text-green-600 px-8 py-3 font-medium hover:bg-green-50 transition">
        View All Vehicles →
      </button>
    </div>
  </section>
);

export default FeaturedVehicles;
