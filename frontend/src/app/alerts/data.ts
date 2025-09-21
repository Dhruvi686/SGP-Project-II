import { AlertTriangle, Info, MapPin, Bell } from 'lucide-react';
import React from 'react';

export interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  type: 'weather' | 'road' | 'health' | 'security';
  isActive: boolean;
}

export interface EmergencyContact {
  title: string;
  number: string;
}

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Heavy Snowfall Warning',
    description: 'Heavy snowfall expected in Khardung La Pass. Road conditions may be hazardous. Travel not recommended for next 48 hours.',
    location: 'Khardung La Pass',
    date: '2023-11-15',
    severity: 'high',
    type: 'weather',
    isActive: true
  },
  {
    id: '2',
    title: 'Road Closure',
    description: 'Manali-Leh highway closed due to landslide near Rohtang Pass. Alternative routes available via Srinagar-Leh highway.',
    location: 'Rohtang Pass',
    date: '2023-11-14',
    severity: 'high',
    type: 'road',
    isActive: true
  },
  {
    id: '3',
    title: 'Altitude Sickness Advisory',
    description: 'Multiple cases of altitude sickness reported at Pangong Lake. Visitors advised to acclimatize properly before visiting.',
    location: 'Pangong Lake',
    date: '2023-11-13',
    severity: 'medium',
    type: 'health',
    isActive: true
  },
  {
    id: '4',
    title: 'Limited Connectivity',
    description: 'Mobile network connectivity limited in Nubra Valley due to maintenance work. Expected to resume by evening.',
    location: 'Nubra Valley',
    date: '2023-11-12',
    severity: 'low',
    type: 'security',
    isActive: true
  },
  {
    id: '5',
    title: 'Flash Flood Warning',
    description: 'Potential flash floods in Zanskar region due to heavy rainfall. Tourists advised to avoid river crossings and stay in safe areas.',
    location: 'Zanskar',
    date: '2023-11-11',
    severity: 'high',
    type: 'weather',
    isActive: true
  },
  {
    id: '6',
    title: 'Oxygen Shortage',
    description: 'Temporary shortage of oxygen cylinders at Leh medical facilities. Tourists with respiratory conditions advised to carry personal supplies.',
    location: 'Leh',
    date: '2023-11-10',
    severity: 'medium',
    type: 'health',
    isActive: false
  },
  {
    id: '7',
    title: 'Military Exercise',
    description: 'Military exercises scheduled near Line of Control. Tourists advised to avoid border areas and follow local authorities\' instructions.',
    location: 'Eastern Ladakh',
    date: '2023-11-09',
    severity: 'medium',
    type: 'security',
    isActive: true
  }
];

export const emergencyContacts: EmergencyContact[] = [
    { title: 'Police Emergency', number: '100' },
    { title: 'Medical Emergency', number: '102' },
    { title: 'Tourist Helpline', number: '1800-111-363' },
    { title: 'Disaster Management', number: '1077' },
    { title: 'Women Helpline', number: '1091' },
    { title: 'Road Accident Emergency', number: '1073' },
];

export const getSeverityColor = (severity: Alert['severity']) => {
    const colors: Record<Alert['severity'], string> = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getTypeIcon = (type: Alert['type']): React.ReactNode => {
    const icons: Record<Alert['type'], React.ReactNode> = {
      weather: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      road: <MapPin className="h-5 w-5 text-red-500" />,
      health: <Info className="h-5 w-5 text-blue-500" />,
      security: <Bell className="h-5 w-5 text-purple-500" />,
    };
    return icons[type] || <Info className="h-5 w-5" />;
};

export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};