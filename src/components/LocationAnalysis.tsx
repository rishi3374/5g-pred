
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Wifi, Building } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FrequencyRange, LocationData } from '@/types';

// Sample 5G frequency ranges based on common bands
const frequencyRanges: FrequencyRange[] = [
  { 
    min: 600, 
    max: 900, 
    band: 'n5/n8', 
    accuracy: 0.82, 
    description: 'Low-band 5G: Better coverage but lower speeds'
  },
  { 
    min: 2500, 
    max: 3700, 
    band: 'n77/n78', 
    accuracy: 0.91, 
    description: 'Mid-band 5G: Good balance of coverage and speed'
  },
  { 
    min: 24000, 
    max: 39000, 
    band: 'n257/n258/n260', 
    accuracy: 0.95, 
    description: 'mmWave: Highest speeds but limited range and penetration'
  }
];

const LocationAnalysis = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFrequencyRange, setSelectedFrequencyRange] = useState<FrequencyRange | null>(null);
  const { toast } = useToast();

  const fetchLocationName = async (lat: number, lon: number) => {
    setGeoLoading(true);
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();
      
      // Construct a readable location name from the response
      const locality = data.locality || '';
      const city = data.city || '';
      const principalSubdivision = data.principalSubdivision || '';
      const countryName = data.countryName || '';
      
      // Create a formatted location name
      let locationName = '';
      if (locality && locality !== city) {
        locationName += locality + ', ';
      }
      if (city) {
        locationName += city + ', ';
      }
      if (principalSubdivision) {
        locationName += principalSubdivision + ', ';
      }
      if (countryName) {
        locationName += countryName;
      }
      
      // If we couldn't get a proper name, use coordinates
      if (!locationName) {
        locationName = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      }
      
      // Update the location with the name
      setLocation(prevLocation => 
        prevLocation ? { ...prevLocation, locationName } : null
      );
      
      setGeoLoading(false);
    } catch (error) {
      console.error('Error fetching location name:', error);
      setGeoLoading(false);
    }
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeters: position.coords.accuracy,
          timestamp: position.timestamp
        };
        
        setLocation(newLocation);
        
        // Fetch the location name
        fetchLocationName(newLocation.latitude, newLocation.longitude);
        
        // For demo purposes, randomly select a frequency range
        // In a real app, this would be determined by actual network data for the location
        const randomIndex = Math.floor(Math.random() * frequencyRanges.length);
        setSelectedFrequencyRange(frequencyRanges[randomIndex]);
        
        setLoading(false);
        toast({
          title: "Location detected",
          description: "Successfully determined your current location",
        });
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Location error",
          description: error.message,
        });
      }
    );
  };

  // Calculate coverage prediction accuracy based on conditions
  const getPredictionAccuracy = () => {
    if (!location || !selectedFrequencyRange) return 0;
    
    // This is a simplified model - in a real app, we would use the actual ML model
    // based on location parameters and selected algorithm
    return selectedFrequencyRange.accuracy * 100;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location-Based Coverage Analysis
        </CardTitle>
        <CardDescription>
          Analyze 5G coverage based on your current location and frequency bands
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col gap-4">
          <Button 
            onClick={getLocation} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                Detect My Location
              </>
            )}
          </Button>
          
          {location && (
            <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              {location.locationName && (
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    Location:
                  </span>
                  <div className="flex items-center gap-1">
                    {geoLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    ) : null}
                    <span className="text-sm font-semibold">
                      {location.locationName}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Coordinates:</span>
                <span className="text-sm font-mono">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              </div>
              {location.accuracyMeters && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Accuracy:</span>
                  <span className="text-sm">±{location.accuracyMeters.toFixed(1)} meters</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Timestamp:</span>
                <span className="text-sm">
                  {new Date(location.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}
          
          {selectedFrequencyRange && (
            <div className="space-y-4 mt-2">
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                  <Wifi className="h-4 w-4" />
                  Available 5G Frequency Analysis
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Band {selectedFrequencyRange.band}
                    </Badge>
                    <span className="text-sm">
                      {selectedFrequencyRange.min} - {selectedFrequencyRange.max} MHz
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {selectedFrequencyRange.description}
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Prediction Accuracy:</span>
                      <span className="text-sm font-semibold">
                        {getPredictionAccuracy().toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={getPredictionAccuracy()} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationAnalysis;
