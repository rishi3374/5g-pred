import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Wifi, Building, Signal, Target, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FrequencyRange, LocationData } from '@/types';
import { Input } from '@/components/ui/input';

// Sample 5G frequency ranges based on common bands
const frequencyRanges: FrequencyRange[] = [
  { 
    min: 600, 
    max: 900, 
    band: 'n5/n8', 
    accuracy: 0.82, 
    description: 'Low-band 5G: Better coverage but lower speeds',
    range: '10-20 km',
    speed: '50-250 Mbps'
  },
  { 
    min: 2500, 
    max: 3700, 
    band: 'n77/n78', 
    accuracy: 0.91, 
    description: 'Mid-band 5G: Good balance of coverage and speed',
    range: '1-5 km',
    speed: '100-900 Mbps'
  },
  { 
    min: 24000, 
    max: 39000, 
    band: 'n257/n258/n260', 
    accuracy: 0.95, 
    description: 'mmWave: Highest speeds but limited range and penetration',
    range: '100-500 m',
    speed: '1-3 Gbps'
  }
];

interface LocationAnalysisProps {
  onLocationUpdate: (location: LocationData | null) => void;
}

const LocationAnalysis = ({ onLocationUpdate }: LocationAnalysisProps) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFrequencyRange, setSelectedFrequencyRange] = useState<FrequencyRange | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const searchLocation = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a location to search",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const locationData = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          accuracy: 50,
          locationName: data[0].display_name.split(',')[0], // Get only the first part (place name)
          locationDetails: null
        };
        
        setLocation(locationData);
        onLocationUpdate(locationData);
        
        // Select the most appropriate frequency range
        const bestRange = frequencyRanges.reduce((best, current) => 
          current.accuracy > best.accuracy ? current : best
        );
        setSelectedFrequencyRange(bestRange);
      } else {
        setError('Location not found. Please try a different search term.');
        onLocationUpdate(null);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setError('Error searching location. Please try again.');
      onLocationUpdate(null);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    setGeoLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const locationData = {
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
            locationName: data.display_name.split(',')[0],
            locationDetails: data
          };

          setLocation(locationData);
          onLocationUpdate(locationData);

          // Select the most appropriate frequency range
          const bestRange = frequencyRanges.reduce((best, current) => 
            current.accuracy > best.accuracy ? current : best
          );
          setSelectedFrequencyRange(bestRange);
        } catch (error) {
          console.error('Error getting location details:', error);
          setError('Error getting location details. Please try again.');
          onLocationUpdate(null);
        } finally {
          setGeoLoading(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Error getting your location. Please try again or search manually.');
        onLocationUpdate(null);
        setGeoLoading(false);
      }
    );
  };

  const getPredictionAccuracy = () => {
    if (!selectedFrequencyRange) return 0;
    return selectedFrequencyRange.accuracy * 100;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Location Analysis</CardTitle>
        <CardDescription>
          Search for a location or use your current location to analyze 5G coverage
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter location name (e.g., New York, London, Tokyo)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              className="flex-1"
            />
            <Button onClick={searchLocation} className="whitespace-nowrap">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex justify-center">
            <span className="text-sm text-muted-foreground">or</span>
          </div>

          {!location && !loading && (
            <Button onClick={getLocation} className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Detect My Location
            </Button>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {location && (
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="font-medium text-lg">{location.locationName}</h3>
                <div className="text-sm text-muted-foreground">
                  <p>Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</p>
                </div>
              </div>
            </div>

            {selectedFrequencyRange && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">5G Network Information</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>Frequency Band: {selectedFrequencyRange.band}</p>
                      <p>Range: {selectedFrequencyRange.range}</p>
                      <p>Expected Speed: {selectedFrequencyRange.speed}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Prediction Accuracy</span>
                    <span className="text-sm text-muted-foreground">
                      {getPredictionAccuracy().toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={getPredictionAccuracy()} className="h-2" />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationAnalysis;
