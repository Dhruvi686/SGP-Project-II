import React from 'react';
import { Shield, Users, Clock, Phone } from 'lucide-react';

const safetyTips = [
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: 'Choose Verified Drivers',
    description: 'Always book with government-verified and rated drivers for safe travel.',
  },
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: 'Travel in Groups',
    description: 'For remote areas, prefer traveling in groups or with experienced guides.',
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-600" />,
    title: 'Plan Your Schedule',
    description: 'Inform someone about your travel plans and expected arrival time.',
  },
  {
    icon: <Phone className="w-6 h-6 text-red-600" />,
    title: 'Emergency Contacts',
    description: 'Keep emergency numbers handy: Police (100), Ambulance (108), Tourist Helpline (1363).',
  },
];

export default function SafetyTips() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Safety Tips for Travel</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {safetyTips.map((tip, index) => (
          <div key={index} className="bg-white border rounded-lg p-6 shadow-md text-center">
            <div className="flex justify-center mb-4">
              {tip.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
            <p className="text-gray-600 text-sm">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}