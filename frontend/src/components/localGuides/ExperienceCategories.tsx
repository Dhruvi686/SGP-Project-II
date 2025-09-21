import {
  FaMountain,
  FaCameraRetro,
  FaPagelines,
  FaUtensils,
} from "react-icons/fa";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Adventure",
    description: "Trekking, mountaineering, and outdoor activities",
    icon: <FaMountain />,
    color: "bg-blue-500",
    isActive: true,
  },
  {
    title: "Photography",
    description: "Guided photo tours to scenic locations",
    icon: <FaCameraRetro />,
    color: "bg-purple-500",
    isActive: false,
  },
  {
    title: "Cultural",
    description: "Monastery visits and cultural immersion",
    icon: <FaPagelines />,
    color: "bg-orange-500",
    isActive: false,
  },
  {
    title: "Culinary",
    description: "Food tours and cooking classes",
    icon: <FaUtensils />,
    color: "bg-green-500",
    isActive: false,
  },
];

export default function ExperienceCategories() {
  return (
    <section className="max-w-4xl mx-auto bg-gray-50 text-center">
      <h2 className="text-2xl font-bold mb-8">Experience Category</h2>

      <div className="grid px-1 grid-cols-1 md:grid-cols-2 gap-5 py-12">
        {categories.map((cat) => (
          <CategoryCard key={cat.title} {...cat} />
        ))}
      </div>
    </section>
  );
}
