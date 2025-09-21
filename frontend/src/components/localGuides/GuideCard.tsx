import { useRouter } from "next/navigation";

interface Guide {
  id: string;
  name: string;
  image: string;
  specialization: string;
  experience: string;
  languages: string[];
  rating?: number;
  location?: string;
  price?: string;
  description?: string;
  specializations?: string[];
  certifications?: string[];
  reviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export default function GuideCard({ guide }: { guide: Guide }) {
  const router = useRouter();

  const handleBookGuide = () => {
    router.push(`/guides/${guide.id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
      <div className="relative">
        <img
          src={guide.image}
          alt={guide.name}
          className="h-64 w-full object-cover"
        />
        {/* Overlay with name and rating */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">{guide.name}</h3>
            {guide.rating && (
              <span className="text-yellow-400 font-semibold flex items-center gap-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {guide.rating}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Specialization:</span>
            <span className="text-gray-900 font-semibold">{guide.specialization}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Experience:</span>
            <span className="text-gray-900 font-semibold">{guide.experience}</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Languages:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {guide.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleBookGuide}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Book Guide
        </button>
      </div>
    </div>
  );
}
