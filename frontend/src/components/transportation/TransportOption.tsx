import {
  FaCarSide,
  FaMotorcycle,
  FaShuttleVan,
  FaTruckMoving,
} from "react-icons/fa";
import CategoryCard from "../localGuides/CategoryCard";

const options = [
  {
    title: "Cars & SUVs",
    description: "Comfortable vehicles for all terrains",
    count: "120+ Vehicles",
    icon: <FaCarSide />,
    color: "bg-blue-600",
  },
  {
    title: "Motorcycles",
    description: "Adventure bikes for thrill-seekers",
    count: "80+ Bikes",
    icon: <FaMotorcycle />,
    color: "bg-green-500",
  },
  {
    title: "Tempo Travellers",
    description: "Group travel with spacious seating",
    count: "50+ Vehicles",
    icon: <FaShuttleVan />,
    color: "bg-purple-600",
  },
  {
    title: "Specialized Vehicles",
    description: "For remote and challenging terrains",
    count: "30+ Vehicles",
    icon: <FaTruckMoving />,
    color: "bg-orange-700",
  },
];

const TransportOptions = () => (
  <section className="py-12 bg-white text-center">
    <h2 className="text-2xl font-bold mb-8">Transport Option</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {options.map((o) => (
        <CategoryCard
          key={o.title}
          title={o.title}
          description={o.description}
          icon={o.icon}
          color={o.color}
          buttonLabel={o.count}
        />
      ))}
    </div>
  </section>
);

export default TransportOptions;
