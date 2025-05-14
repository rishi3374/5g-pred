import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LocationData } from '@/types';

interface FeatureImportanceProps {
  selectedLocation: LocationData | null;
}

interface FeatureData {
  name: string;
  importance: number;
  category: string;
  description: string;
}

const FeatureImportance = ({ selectedLocation }: FeatureImportanceProps) => {
  const [data, setData] = useState<FeatureData[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('xgboost');

  useEffect(() => {
    if (!selectedLocation) return;

    // Generate location-specific feature importance data
    const generateData = () => {
      const baseFeatures: FeatureData[] = [
        {
          name: 'Population Density',
          importance: 0.85,
          category: 'Demographic',
          description: 'Number of people per square kilometer'
        },
        {
          name: 'Terrain Type',
          importance: 0.78,
          category: 'Geographic',
          description: 'Physical characteristics of the land'
        },
        {
          name: 'Building Density',
          importance: 0.72,
          category: 'Infrastructure',
          description: 'Number of buildings per area'
        },
        {
          name: 'Distance from Tower',
          importance: 0.68,
          category: 'Network',
          description: 'Distance from nearest 5G tower'
        },
        {
          name: 'Signal Strength',
          importance: 0.65,
          category: 'Network',
          description: 'Current signal strength in the area'
        }
      ];

      // Adjust feature importance based on location characteristics
      return baseFeatures.map(feature => {
        let importance = feature.importance;
        
        // Adjust based on location type
        if (selectedLocation.locationType === 'urban') {
          if (feature.name === 'Population Density') importance += 0.1;
          if (feature.name === 'Building Density') importance += 0.15;
        } else if (selectedLocation.locationType === 'rural') {
          if (feature.name === 'Terrain Type') importance += 0.12;
          if (feature.name === 'Distance from Tower') importance += 0.1;
        }

        // Adjust based on frequency range
        if (selectedLocation.frequencyRange === 'low') {
          if (feature.name === 'Distance from Tower') importance += 0.08;
          if (feature.name === 'Signal Strength') importance += 0.05;
        } else if (selectedLocation.frequencyRange === 'high') {
          if (feature.name === 'Building Density') importance += 0.08;
          if (feature.name === 'Population Density') importance += 0.05;
        }

        // Normalize importance to max 1.0
        importance = Math.min(importance, 1.0);

        return {
          ...feature,
          importance
        };
      }).sort((a, b) => b.importance - a.importance);
    };

    const featureData = generateData();
    setData(featureData);
  }, [selectedLocation, selectedAlgorithm]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>
              {selectedLocation 
                ? `Key factors affecting coverage in ${selectedLocation.locationName}`
                : 'Select a location to view feature importance'}
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
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 1]} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as FeatureData;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm text-muted-foreground">{data.description}</p>
                        <p className="text-sm mt-2">Importance: {(data.importance * 100).toFixed(1)}%</p>
                        <p className="text-sm">Category: {data.category}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="importance" 
                name="Importance Score" 
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureImportance; 