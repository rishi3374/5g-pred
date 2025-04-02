
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { features } from '@/data/algorithms';
import { Database, MapPin, Layers, Signal, Building, TreePine, CloudRain } from 'lucide-react';

const Features = () => {
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);
  
  const COLORS = ['#4C51BF', '#805AD5', '#6B46C1', '#9F7AEA', '#B794F4', '#D6BCFA'];
  
  const pieChartData = sortedFeatures.map(feature => ({
    name: feature.name,
    value: feature.importance
  }));
  
  const getFeatureIcon = (featureId: string) => {
    switch (featureId) {
      case 'distance':
        return <MapPin className="h-10 w-10 text-primary" />;
      case 'buildings':
        return <Building className="h-10 w-10 text-primary" />;
      case 'altitude':
        return <Layers className="h-10 w-10 text-primary" />;
      case 'vegetation':
        return <TreePine className="h-10 w-10 text-primary" />;
      case 'weather':
        return <CloudRain className="h-10 w-10 text-primary" />;
      case 'frequency':
        return <Signal className="h-10 w-10 text-primary" />;
      default:
        return <Database className="h-10 w-10 text-primary" />;
    }
  };
  
  // Simulated data showing relationship between each feature and coverage
  const generateRelationshipData = (featureId: string) => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
      const x = i / 10;
      let y = 0;
      
      // Different relationships for different features
      switch (featureId) {
        case 'distance':
          y = 1 - Math.pow(x, 1.5); // Inverse relationship
          break;
        case 'buildings':
          y = 1 - x; // Linear inverse
          break;
        case 'altitude':
          y = 0.5 + x * 0.5; // Positive linear
          break;
        case 'vegetation':
          y = 1 - Math.pow(x, 0.8); // Soft inverse
          break;
        case 'weather':
          y = 1 - Math.pow(x, 0.5); // Moderate inverse
          break;
        case 'frequency':
          // Higher frequency = shorter range but higher bandwidth
          y = x < 0.5 ? 0.8 - x * 0.2 : 0.7 - (x - 0.5) * 0.8;
          break;
        default:
          y = 1 - x;
      }
      
      // Add some noise
      y = Math.max(0, Math.min(1, y + (Math.random() * 0.1 - 0.05)));
      
      data.push({
        x: x.toFixed(1),
        coverage: (y * 100).toFixed(1)
      });
    }
    return data;
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Feature Analysis</h1>
          <p className="text-gray-600 max-w-3xl">
            Understand the importance and impact of different features on 5G coverage prediction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance</CardTitle>
              <CardDescription>The relative importance of each feature in predicting 5G coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortedFeatures.map(feature => ({
                      name: feature.name,
                      importance: feature.importance * 100
                    }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                    <XAxis 
                      type="number" 
                      domain={[0, 30]} 
                      label={{ value: 'Importance (%)', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis type="category" dataKey="name" width={110} />
                    <Tooltip formatter={(value) => {
                      return typeof value === 'number' ? [`${value.toFixed(1)}%`] : [value];
                    }} />
                    <Bar 
                      dataKey="importance" 
                      fill="#6B46C1" 
                      radius={[0, 4, 4, 0]}
                      background={{ fill: '#f0f0f0' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Relative Importance Distribution</CardTitle>
              <CardDescription>Proportion of each feature's contribution to predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => {
                        return typeof percent === 'number' 
                          ? `${name}: ${(percent * 100).toFixed(1)}%` 
                          : `${name}: ${percent}%`;
                      }}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => {
                      return typeof value === 'number' 
                        ? [`${(value * 100).toFixed(1)}%`, 'Importance'] 
                        : [value, 'Importance'];
                    }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedFeatures.map((feature, index) => (
            <Card key={feature.id} className="feature-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2" variant={index < 3 ? "default" : "secondary"}>
                      {index < 3 ? 'Primary Factor' : 'Secondary Factor'}
                    </Badge>
                    <CardTitle className="flex items-center">
                      {feature.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Importance: {(feature.importance * 100).toFixed(1)}%
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    {getFeatureIcon(feature.id)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generateRelationshipData(feature.id)}
                      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="x" 
                        label={{ 
                          value: feature.id === 'distance' ? 'Distance (normalized)' : 
                                 feature.id === 'buildings' ? 'Building Density' :
                                 feature.id === 'altitude' ? 'Altitude (normalized)' :
                                 feature.id === 'vegetation' ? 'Vegetation Density' :
                                 feature.id === 'weather' ? 'Weather Severity' :
                                 feature.id === 'frequency' ? 'Frequency (normalized)' : 'Value',
                          position: 'insideBottom',
                          offset: -5,
                          fontSize: 10
                        }} 
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        label={{ 
                          value: 'Coverage (%)', 
                          angle: -90, 
                          position: 'insideLeft',
                          fontSize: 10
                        }} 
                      />
                      <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
                      <Line 
                        type="monotone" 
                        dataKey="coverage" 
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Feature Interaction Analysis</CardTitle>
            <CardDescription>
              Understanding how features interact with each other to affect 5G coverage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mt-0">Key Feature Interactions</h3>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="text-md font-semibold">Distance & Building Density</h4>
                  <p className="text-sm">
                    When both distance to tower is high and building density is high, coverage drops dramatically 
                    (more than would be expected from each factor alone). This indicates a multiplicative effect
                    where buildings block signals more effectively at longer distances.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="text-md font-semibold">Altitude & Weather Conditions</h4>
                  <p className="text-sm">
                    Higher altitude locations show less sensitivity to adverse weather conditions. 
                    This suggests that elevation helps maintain line-of-sight connections even during
                    poor weather, making altitude a mitigating factor for weather-related signal degradation.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="text-md font-semibold">Frequency & Vegetation</h4>
                  <p className="text-sm">
                    Higher frequency bands (28-30 GHz) are significantly more affected by vegetation density
                    than lower bands (24-26 GHz). The attenuation effect nearly doubles in dense vegetation areas
                    when using the highest frequencies.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6">Feature Selection Insights</h3>
              <p className="text-sm">
                Our analysis shows that a model using just the top 3 features (Distance to Tower, Building Density, and Altitude)
                achieves 85% of the full model's accuracy, highlighting their dominance in prediction quality.
                However, for edge cases like dense urban areas with unique topography, the secondary features become
                more important for accurate predictions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Features;
