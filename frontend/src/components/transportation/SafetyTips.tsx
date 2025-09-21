import { FaShieldAlt, FaCarAlt, FaMapMarkedAlt } from "react-icons/fa";

const SafetyAndTips = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Safety First */}
        <div>
          <h3 className="text-xl font-bold mb-6">Safety First</h3>

          <div className="flex items-start gap-4 mb-6">
            <div className="bg-green-100 text-green-700 p-3 rounded-full text-xl">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-semibold text-black">Verified Drivers</h4>
              <p className="text-gray-600 text-sm">
                All drivers are experienced mountain trained and verified by the
                government
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="bg-green-100 text-green-700 p-3 rounded-full text-xl">
              <FaCarAlt />
            </div>
            <div>
              <h4 className="font-semibold text-black">
                Well-Maintained Vehicles
              </h4>
              <p className="text-gray-600 text-sm">
                Regular inspections and maintenance for all vehicles in fleet
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-green-100 text-green-700 p-3 rounded-full text-xl">
              <FaMapMarkedAlt />
            </div>
            <div>
              <h4 className="font-semibold text-black">GPS Tracking</h4>
              <p className="text-gray-600 text-sm">
                Real-time location tracking for vehicles for added safety
              </p>
            </div>
          </div>
        </div>

        {/* Right: Booking Tips */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Transport Booking Tips</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            {[
              "Book your transport at least 1–2 weeks in advance during peak season",
              "Choose vehicles appropriate for the terrain you plan to visit",
              "Confirm if your vehicle has oxygen support for high altitude passes",
              "Check if your driver is familiar with the specific routes you plan to take",
              "Always carry emergency contact numbers and first supplies",
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SafetyAndTips;
