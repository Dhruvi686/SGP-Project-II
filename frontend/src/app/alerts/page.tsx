'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, AlertTriangle, Info, MapPin, Calendar, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, mockAlerts, emergencyContacts, getSeverityColor, getTypeIcon, formatDate, EmergencyContact } from './data';

export default function SafetyAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAlerts = useMemo(() => alerts.filter(alert => {
    // Filter by search query
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && alert.isActive) ||
      (activeTab === 'weather' && alert.type === 'weather') ||
      (activeTab === 'road' && alert.type === 'road') ||
      (activeTab === 'health' && alert.type === 'health') ||
      (activeTab === 'security' && alert.type === 'security');
    
    return matchesSearch && matchesTab;
  }), [alerts, searchQuery, activeTab]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Safety Alerts</h1>
          <p className="text-gray-600">
            Stay informed about current safety conditions in Ladakh
          </p>
        </div>
        
        <AlertFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <AlertTabs />
        
        <AlertsDisplay
          loading={loading}
          error={error}
          alerts={filteredAlerts}
          searchQuery={searchQuery}
        />
      </Tabs>
      
      <EmergencyContacts contacts={emergencyContacts} />
      
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Subscribe to Alerts
        </Button>
      </div>
    </div>
  );
}

const AlertFilters = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => (
  <div className="mt-4 md:mt-0 relative w-full md:w-64">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
    <Input
      placeholder="Search alerts..."
      className="pl-8"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

const AlertTabs = () => (
  <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="weather">Weather</TabsTrigger>
    <TabsTrigger value="road">Road</TabsTrigger>
    <TabsTrigger value="health">Health</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
);

const AlertCard = ({ alert }: { alert: Alert }) => (
  <Card className={`overflow-hidden border-l-4 ${alert.isActive ? 'border-l-red-500' : 'border-l-gray-300'}`}>
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon(alert.type)}
          <h3 className="text-lg font-semibold">{alert.title}</h3>
        </div>
        <Badge className={`${getSeverityColor(alert.severity)} ml-2`}>
          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
        </Badge>
      </div>
      
      <p className="text-gray-700 mb-4">{alert.description}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{alert.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(alert.date)}</span>
        </div>
        {!alert.isActive && (
          <Badge variant="outline" className="bg-gray-100">
            Resolved
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

const AlertsDisplay = ({ loading, error, alerts, searchQuery }: { loading: boolean, error: string, alerts: Alert[], searchQuery: string }) => {
  const content = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      );
    }
    if (alerts.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
          <p className="mt-2 text-gray-500">
            {searchQuery ? 'Try adjusting your search terms.' : 'There are currently no safety alerts.'}
          </p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    );
  };

  return <TabsContent value={useMemo(() => 'all', [])} className="mt-0">{content()}</TabsContent>;
};

const EmergencyContacts = ({ contacts }: { contacts: EmergencyContact[] }) => (
  <Card className="bg-blue-50 border-blue-100 mb-8">
    <CardHeader className="pb-2">
      <CardTitle className="text-blue-800">Emergency Contacts</CardTitle>
      <CardDescription className="text-blue-700">
        Keep these numbers handy during your stay in Ladakh
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact.title} className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium mb-1">{contact.title}</h4>
            <p className="text-lg font-bold">{contact.number}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);