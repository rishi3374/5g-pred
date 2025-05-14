import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LocationData } from '@/types';
import { MapPin, Search, Signal, Wifi, BarChart3, Users, Radio, Activity, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LocationAnalysisProps {
  onLocationUpdate: (location: LocationData) => void;
}

interface VillageData {
  name: string;
  distance: number;
  population: number;
  coverage: number;
  signalStrength: number;
  accuracy: number;
  networkType: '5G' | '4G' | '3G' | '2G';
  issues: string[];
  lastUpdated: string;
}

interface NetworkStats {
  averageCoverage: number;
  averageSignalStrength: number;
  totalVillages: number;
  coveredVillages: number;
  populationCovered: number;
  totalPopulation: number;
  networkTypeDistribution: {
    '5G': number;
    '4G': number;
    '3G': number;
    '2G': number;
  };
  coverageTrend: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LocationAnalysis = ({ onLocationUpdate }: LocationAnalysisProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [nearbyVillages, setNearbyVillages] = useState<VillageData[]>([]);
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    averageCoverage: 0,
    averageSignalStrength: 0,
    totalVillages: 0,
    coveredVillages: 0,
    populationCovered: 0,
    totalPopulation: 0,
    networkTypeDistribution: {
      '5G': 0,
      '4G': 0,
      '3G': 0,
      '2G': 0
    },
    coverageTrend: {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0
    }
  });

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call with sample data
    setTimeout(() => {
      const sampleLocation: LocationData = {
        latitude: 28.6139,
        longitude: 77.2090,
        locationName: searchQuery || 'New Delhi',
        locationType: 'urban',
        frequencyRange: 'high',
        accuracy: 0.92,
        timestamp: new Date().toISOString()
      };
      
      setSelectedLocation(sampleLocation);
      onLocationUpdate(sampleLocation);
      
      // Generate sample village data
      generateVillageData(sampleLocation);
      
      setLoading(false);
    }, 1000);
  };

  const handleUseCurrentLocation = () => {
    setLoading(true);
    // Simulate getting current location
    setTimeout(() => {
      const currentLocation: LocationData = {
        latitude: 28.6139,
        longitude: 77.2090,
        locationName: 'Current Location',
        locationType: 'urban',
        frequencyRange: 'medium',
        accuracy: 0.88,
        timestamp: new Date().toISOString()
      };
      
      setSelectedLocation(currentLocation);
      onLocationUpdate(currentLocation);
      
      // Generate sample village data
      generateVillageData(currentLocation);
      
      setLoading(false);
    }, 1000);
  };

  const generateVillageData = (location: LocationData) => {
    // Generate sample villages with varying distances and coverage
    const villages: VillageData[] = [];
    const distances = [1, 2, 3, 4, 5]; // km
    const villagesPerRing = [4, 8, 12, 16, 20]; // number of villages in each ring
    
    let totalPopulation = 0;
    let coveredPopulation = 0;
    let coveredVillages = 0;
    let totalCoverage = 0;
    let totalSignalStrength = 0;
    let networkTypeCount = {
      '5G': 0,
      '4G': 0,
      '3G': 0,
      '2G': 0
    };
    let coverageTrendCount = {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0
    };
    
    distances.forEach((distance, ringIndex) => {
      const numVillages = villagesPerRing[ringIndex];
      for (let i = 0; i < numVillages; i++) {
        const population = Math.floor(Math.random() * 5000) + 500;
        const coverage = Math.random() * 100;
        const signalStrength = Math.max(0, 100 - (distance * 15) + (Math.random() * 20 - 10));
        const accuracy = Math.min(100, Math.max(0, 80 - (distance * 5) + (Math.random() * 20 - 10)));
        
        // Determine network type based on distance and random factor
        const networkTypes: ('5G' | '4G' | '3G' | '2G')[] = ['5G', '4G', '3G', '2G'];
        const networkType = networkTypes[Math.min(Math.floor(distance / 2), 3)];
        networkTypeCount[networkType]++;
        
        // Determine coverage trend
        if (coverage >= 80) coverageTrendCount.excellent++;
        else if (coverage >= 60) coverageTrendCount.good++;
        else if (coverage >= 40) coverageTrendCount.fair++;
        else coverageTrendCount.poor++;
        
        // Generate random issues
        const possibleIssues = [
          'Signal interference',
          'Network congestion',
          'Tower maintenance',
          'Weather impact',
          'Infrastructure limitations'
        ];
        const numIssues = Math.floor(Math.random() * 3);
        const issues = possibleIssues
          .sort(() => Math.random() - 0.5)
          .slice(0, numIssues);
        
        villages.push({
          name: `Village ${villages.length + 1}`,
          distance,
          population,
          coverage,
          signalStrength,
          accuracy,
          networkType,
          issues,
          lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString()
        });
        
        totalPopulation += population;
        if (coverage > 50) {
          coveredPopulation += population;
          coveredVillages++;
        }
        totalCoverage += coverage;
        totalSignalStrength += signalStrength;
      }
    });
    
    setNearbyVillages(villages);
    
    // Calculate network statistics
    setNetworkStats({
      averageCoverage: totalCoverage / villages.length,
      averageSignalStrength: totalSignalStrength / villages.length,
      totalVillages: villages.length,
      coveredVillages,
      populationCovered: coveredPopulation,
      totalPopulation,
      networkTypeDistribution: networkTypeCount,
      coverageTrend: coverageTrendCount
    });
  };

  const getCoverageStatus = (coverage: number) => {
    if (coverage >= 80) return { label: 'Excellent', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (coverage >= 60) return { label: 'Good', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (coverage >= 40) return { label: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { label: 'Poor', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const networkTypeData = [
    { name: '5G', value: networkStats.networkTypeDistribution['5G'] },
    { name: '4G', value: networkStats.networkTypeDistribution['4G'] },
    { name: '3G', value: networkStats.networkTypeDistribution['3G'] },
    { name: '2G', value: networkStats.networkTypeDistribution['2G'] }
  ];

  const coverageTrendData = [
    { name: 'Excellent', value: networkStats.coverageTrend.excellent },
    { name: 'Good', value: networkStats.coverageTrend.good },
    { name: 'Fair', value: networkStats.coverageTrend.fair },
    { name: 'Poor', value: networkStats.coverageTrend.poor }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Location Analysis</CardTitle>
        <CardDescription>Search for a location or use your current location to analyze 5G coverage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter location (e.g., New Delhi)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
            <Button
              variant="outline"
              onClick={handleUseCurrentLocation}
              disabled={loading}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>
        </div>

        {selectedLocation && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Signal className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Network Coverage</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{networkStats.averageCoverage.toFixed(1)}%</span>
                  <span className="text-sm text-muted-foreground">average</span>
                </div>
                <Progress value={networkStats.averageCoverage} className="mt-2" />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Signal Strength</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{networkStats.averageSignalStrength.toFixed(1)}%</span>
                  <span className="text-sm text-muted-foreground">average</span>
                </div>
                <Progress value={networkStats.averageSignalStrength} className="mt-2" />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Population Coverage</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{((networkStats.populationCovered / networkStats.totalPopulation) * 100).toFixed(1)}%</span>
                  <span className="text-sm text-muted-foreground">covered</span>
                </div>
                <Progress value={(networkStats.populationCovered / networkStats.totalPopulation) * 100} className="mt-2" />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Prediction Accuracy</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{(selectedLocation.accuracy * 100).toFixed(1)}%</span>
                  <span className="text-sm text-muted-foreground">for {selectedLocation.locationName}</span>
                </div>
                <Progress value={selectedLocation.accuracy * 100} className="mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Network Type Distribution</CardTitle>
                  <CardDescription>Distribution of network types across nearby villages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={networkTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {networkTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coverage Quality Distribution</CardTitle>
                  <CardDescription>Distribution of coverage quality across villages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={coverageTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8">
                          {coverageTrendData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Nearby Villages Network Coverage</h3>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Villages</TabsTrigger>
                  <TabsTrigger value="covered">Covered Villages</TabsTrigger>
                  <TabsTrigger value="uncovered">Uncovered Villages</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-2">
                  {nearbyVillages.map((village, index) => (
                    <VillageCard key={index} village={village} />
                  ))}
                </TabsContent>
                <TabsContent value="covered" className="space-y-2">
                  {nearbyVillages.filter(v => v.coverage > 50).map((village, index) => (
                    <VillageCard key={index} village={village} />
                  ))}
                </TabsContent>
                <TabsContent value="uncovered" className="space-y-2">
                  {nearbyVillages.filter(v => v.coverage <= 50).map((village, index) => (
                    <VillageCard key={index} village={village} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VillageCard = ({ village }: { village: VillageData }) => {
  const coverageStatus = getCoverageStatus(village.coverage);
  
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{village.name}</h4>
            <Badge variant={village.coverage > 50 ? "default" : "secondary"}>
              {village.coverage > 50 ? "Covered" : "Limited Coverage"}
            </Badge>
            <Badge className={`${coverageStatus.bg} ${coverageStatus.color}`}>
              {coverageStatus.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{village.distance}km from selected location</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Radio className="h-4 w-4" />
            <span>{village.networkType} Network</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Population</span>
            </div>
            <p className="text-sm">{village.population.toLocaleString()}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Coverage</span>
            </div>
            <p className="text-sm">{village.coverage.toFixed(1)}%</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Signal</span>
            </div>
            <p className="text-sm">{village.signalStrength.toFixed(1)}%</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Accuracy</span>
            </div>
            <p className="text-sm">{village.accuracy.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      {village.issues.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <h5 className="text-sm font-medium">Known Issues</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {village.issues.map((issue, index) => (
              <Badge key={index} variant="outline" className="bg-yellow-500/10 text-yellow-500">
                {issue}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date(village.lastUpdated).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          {village.coverage > 50 ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span>{village.coverage > 50 ? 'Operational' : 'Needs Attention'}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationAnalysis; 