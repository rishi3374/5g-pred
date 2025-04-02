
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { comparisonResults, algorithms } from '@/data/algorithms';

const TrainingTimeChart = () => {
  const chartData = comparisonResults.map(result => {
    const algorithm = algorithms.find(a => a.id === result.algorithmId);
    return {
      name: algorithm?.name || result.algorithmId,
      accuracy: result.accuracy * 100,
      trainingTime: result.trainingTime,
      inferenceTime: result.inferenceTime,
      color: algorithm?.color
    };
  });

  return (
    <Card className="shadow-md col-span-2">
      <CardHeader>
        <CardTitle>Training & Inference Time Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 100]}
                label={{ value: 'Accuracy (%)', angle: -90, position: 'insideRight' }} 
              />
              <Tooltip formatter={(value, name) => {
                if (name === 'accuracy' && typeof value === 'number') return [`${value.toFixed(1)}%`, 'Accuracy'];
                if (name === 'trainingTime' && typeof value === 'number') return [`${value.toFixed(1)}s`, 'Training Time'];
                if (name === 'inferenceTime' && typeof value === 'number') return [`${value.toFixed(1)}s`, 'Inference Time'];
                return [value, name];
              }} />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="trainingTime" 
                name="Training Time" 
                fill="#805AD5" 
                barSize={20} 
              />
              <Bar 
                yAxisId="left" 
                dataKey="inferenceTime" 
                name="Inference Time" 
                fill="#D6BCFA" 
                barSize={20} 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="accuracy" 
                name="Accuracy" 
                stroke="#4C51BF" 
                strokeWidth={2}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingTimeChart;
