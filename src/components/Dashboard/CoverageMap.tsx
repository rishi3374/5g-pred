import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { LocationData } from '@/types';

interface CoverageMapProps {
  selectedLocation: LocationData | null;
}

const CoverageMap = ({ selectedLocation }: CoverageMapProps) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('xgboost');

  useEffect(() => {
    if (!selectedLocation) return;

    // Generate sample data points around the selected location
    const generateData = () => {
      const dataPoints = [];
      const baseLat = selectedLocation.latitude;
      const baseLng = selectedLocation.longitude;
      
      // Generate villages in concentric circles around the selected location
      const distances = [1, 2, 3, 4, 5]; // km
      const villagesPerRing = [4, 8, 12, 16, 20]; // number of villages in each ring
      
      distances.forEach((distance, ringIndex) => {
        const numVillages = villagesPerRing[ringIndex];
        for (let i = 0; i < numVillages; i++) {
          const angle = (i / numVillages) * 2 * Math.PI;
          const lat = baseLat + (distance * Math.cos(angle)) / 111; // 111 km per degree
          const lng = baseLng + (distance * Math.sin(angle)) / (111 * Math.cos(baseLat * Math.PI / 180));
          
          const actualCoverage = Math.random() > 0.3;
          const predictedCoverage = Math.random() > 0.3;
          
          dataPoints.push({
            latitude: lat,
            longitude: lng,
            distance: distance,
            villageName: `Village ${dataPoints.length + 1}`,
            actualCoverage,
            predictedCoverage,
            isCorrect: actualCoverage === predictedCoverage
          });
        }
      });
      
      return dataPoints;
    };

    const dataPoints = generateData();
    setData(dataPoints);
  }, [selectedLocation]);

  const processData = () => {
    if (!data.length) return [];

    // Group villages by distance rings
    const rings = data.reduce((acc: any, point) => {
      const ring = Math.ceil(point.distance);
      if (!acc[ring]) {
        acc[ring] = {
          name: `Ring ${ring}`,
          correct: 0,
          incorrect: 0,
          total: 0,
          villages: []
        };
      }
      acc[ring].total++;
      if (point.isCorrect) {
        acc[ring].correct++;
      } else {
        acc[ring].incorrect++;
      }
      acc[ring].villages.push(point.villageName);
      return acc;
    }, {});

    return Object.values(rings).map((ring: any) => ({
      name: `${ring.name} (${ring.villages.length} villages)`,
      correct: ring.correct,
      incorrect: ring.incorrect,
      total: ring.total,
      villages: ring.villages.join(', ')
    }));
  };

  const chartData = processData();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Coverage Prediction Map</CardTitle>
            <CardDescription>
              {selectedLocation 
                ? `Showing coverage predictions for villages within ${Math.max(...data.map(d => d.distance))}km of ${selectedLocation.locationName}`
                : 'Select a location to view coverage predictions'}
            </CardDescription>
          </div>
          <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xgboost">XGBoost</SelectItem>
              <SelectItem value="randomforest">Random Forest</SelectItem>
              <SelectItem value="neuralnet">Neural Network</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm text-muted-foreground">Villages: {data.villages}</p>
                        <p className="text-sm">Correct Predictions: {data.correct}</p>
                        <p className="text-sm">Incorrect Predictions: {data.incorrect}</p>
                        <p className="text-sm">Accuracy: {((data.correct / data.total) * 100).toFixed(1)}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="correct" name="Correct Predictions" fill="#22c55e" />
              <Bar dataKey="incorrect" name="Incorrect Predictions" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverageMap;
