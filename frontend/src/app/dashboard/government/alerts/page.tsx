'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bell, Calendar, Edit, MapPin, Plus, Search, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  type: 'weather' | 'road' | 'health' | 'security';
  isActive: boolean;
}

export default function GovernmentAlertsDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([
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
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [newAlert, setNewAlert] = useState<Omit<Alert, 'id'>>({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    severity: 'medium',
    type: 'weather',
    isActive: true
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'road':
        return <MapPin className="h-5 w-5 text-red-500" />;
      case 'health':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'security':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredAlerts = alerts.filter(alert => {
    // Filter by search query
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && alert.isActive) ||
      (activeTab === 'inactive' && !alert.isActive) ||
      (activeTab === 'weather' && alert.type === 'weather') ||
      (activeTab === 'road' && alert.type === 'road') ||
      (activeTab === 'health' && alert.type === 'health') ||
      (activeTab === 'security' && alert.type === 'security');
    
    return matchesSearch && matchesTab;
  });

  const handleAddAlert = () => {
    const id = Math.random().toString(36).substring(2, 9);
    setAlerts([
      {
        ...newAlert,
        id
      } as Alert,
      ...alerts
    ]);
    setNewAlert({
      title: '',
      description: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      severity: 'medium',
      type: 'weather',
      isActive: true
    });
    setIsAddDialogOpen(false);
  };

  const handleEditAlert = () => {
    if (!currentAlert) return;
    
    setAlerts(alerts.map(alert => 
      alert.id === currentAlert.id ? currentAlert : alert
    ));
    setIsEditDialogOpen(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const openEditDialog = (alert: Alert) => {
    setCurrentAlert(alert);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Safety Alerts Management</h1>
          <p className="text-gray-600">
            Create and manage safety alerts for tourists in Ladakh
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search alerts..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Safety Alert</DialogTitle>
                <DialogDescription>
                  Add details for the new safety alert. This will be visible to all tourists.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAlert.date}
                    onChange={(e) => setNewAlert({ ...newAlert, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={newAlert.type}
                    onValueChange={(value: any) => setNewAlert({ ...newAlert, type: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weather">Weather</SelectItem>
                      <SelectItem value="road">Road</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="severity" className="text-right">
                    Severity
                  </Label>
                  <Select
                    value={newAlert.severity}
                    onValueChange={(value: any) => setNewAlert({ ...newAlert, severity: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newAlert.description}
                    onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAlert}>Create Alert</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="road">Road</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery ? 'Try adjusting your search terms.' : 'There are currently no safety alerts.'}
                </p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <Card key={alert.id} className={`overflow-hidden border-l-4 ${alert.isActive ? 'border-l-red-500' : 'border-l-gray-300'}`}>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(alert.type)}
                          <h3 className="text-lg font-semibold">{alert.title}</h3>
                          <Badge className={`${getSeverityColor(alert.severity)} ml-2`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(alert)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteAlert(alert.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleActive(alert.id)}
                          >
                            {alert.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
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
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        {/* Other tab contents use the same content, the filtering is done in the filteredAlerts variable */}
        <TabsContent value="active" className="mt-0">
          {/* Same content as "all" tab */}
        </TabsContent>
        <TabsContent value="inactive" className="mt-0">
          {/* Same content as "all" tab */}
        </TabsContent>
        <TabsContent value="weather" className="mt-0">
          {/* Same content as "all" tab */}
        </TabsContent>
        <TabsContent value="road" className="mt-0">
          {/* Same content as "all" tab */}
        </TabsContent>
        <TabsContent value="health" className="mt-0">
          {/* Same content as "all" tab */}
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          {/* Same content as "all" tab */}
        </TabsContent>
      </Tabs>
      
      {/* Edit Alert Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Safety Alert</DialogTitle>
            <DialogDescription>
              Update the details of this safety alert.
            </DialogDescription>
          </DialogHeader>
          
          {currentAlert && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={currentAlert.title}
                  onChange={(e) => setCurrentAlert({ ...currentAlert, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="edit-location"
                  value={currentAlert.location}
                  onChange={(e) => setCurrentAlert({ ...currentAlert, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={currentAlert.date}
                  onChange={(e) => setCurrentAlert({ ...currentAlert, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={currentAlert.type}
                  onValueChange={(value: any) => setCurrentAlert({ ...currentAlert, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weather">Weather</SelectItem>
                    <SelectItem value="road">Road</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-severity" className="text-right">
                  Severity
                </Label>
                <Select
                  value={currentAlert.severity}
                  onValueChange={(value: any) => setCurrentAlert({ ...currentAlert, severity: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={currentAlert.description}
                  onChange={(e) => setCurrentAlert({ ...currentAlert, description: e.target.value })}
                  className="col-span-3"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={currentAlert.isActive ? 'active' : 'inactive'}
                  onValueChange={(value: any) => setCurrentAlert({ ...currentAlert, isActive: value === 'active' })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAlert}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Card className="mt-8 p-4">
        <CardHeader className="pb-2">
          <CardTitle>Alert Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="text-sm text-blue-700 mb-1">Total Alerts</h4>
              <p className="text-2xl font-bold">{alerts.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="text-sm text-green-700 mb-1">Active Alerts</h4>
              <p className="text-2xl font-bold">{alerts.filter(a => a.isActive).length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <h4 className="text-sm text-yellow-700 mb-1">High Severity</h4>
              <p className="text-2xl font-bold">{alerts.filter(a => a.severity === 'high').length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="text-sm text-purple-700 mb-1">This Week</h4>
              <p className="text-2xl font-bold">{alerts.filter(a => {
                const alertDate = new Date(a.date);
                const today = new Date();
                const weekAgo = new Date();
                weekAgo.setDate(today.getDate() - 7);
                return alertDate >= weekAgo;
              }).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}