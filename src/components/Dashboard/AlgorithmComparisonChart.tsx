
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { algorithms } from '@/data/algorithms';

const AlgorithmComparisonChart = () => {
  const chartData = algorithms.map(algo => ({
    name: algo.name,
    accuracy: algo.accuracy * 100,
    precision: algo.precision * 100,
    recall: algo.recall * 100,
    f1Score: algo.f1Score * 100,
    color: algo.color
  }));

  return (
    <Card className="shadow-md col-span-2">
      <CardHeader>
        <CardTitle>Algorithm Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)}%`]}
                labelFormatter={(value) => `Algorithm: ${value}`}
              />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy" fill="#4C51BF" />
              <Bar dataKey="precision" name="Precision" fill="#805AD5" />
              <Bar dataKey="recall" name="Recall" fill="#6B46C1" />
              <Bar dataKey="f1Score" name="F1 Score" fill="#9F7AEA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmComparisonChart;
