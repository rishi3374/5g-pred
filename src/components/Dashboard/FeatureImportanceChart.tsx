
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { features } from '@/data/algorithms';

const FeatureImportanceChart = () => {
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);
  
  const chartData = sortedFeatures.map(feature => ({
    name: feature.name,
    importance: feature.importance * 100,
    description: feature.description
  }));

  return (
    <Card className="shadow-md col-span-2">
      <CardHeader>
        <CardTitle>Feature Importance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
              <XAxis type="number" domain={[0, 30]} label={{ value: 'Importance (%)', position: 'insideBottom', offset: -5 }} />
              <YAxis type="category" dataKey="name" width={110} />
              <Tooltip 
                formatter={(value) => {
                  if (typeof value === 'number') {
                    return [`${value.toFixed(1)}%`];
                  }
                  return [value];
                }}
                labelFormatter={(name) => `Feature: ${name}`}
              />
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
  );
};

export default FeatureImportanceChart;
