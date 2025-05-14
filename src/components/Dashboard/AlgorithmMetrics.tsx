import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AlgorithmMetrics = () => {
  const data = [
    { name: 'XGBoost', accuracy: 0.92, precision: 0.89, recall: 0.94, f1Score: 0.91, latency: 120 },
    { name: 'Random Forest', accuracy: 0.88, precision: 0.86, recall: 0.90, f1Score: 0.88, latency: 85 },
    { name: 'Neural Network', accuracy: 0.90, precision: 0.88, recall: 0.92, f1Score: 0.90, latency: 150 },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Algorithm Performance</CardTitle>
        <CardDescription>Comparison of different algorithms' performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">Accuracy: {(data.accuracy * 100).toFixed(1)}%</p>
                          <p className="text-sm">Precision: {(data.precision * 100).toFixed(1)}%</p>
                          <p className="text-sm">Recall: {(data.recall * 100).toFixed(1)}%</p>
                          <p className="text-sm">F1 Score: {(data.f1Score * 100).toFixed(1)}%</p>
                          <p className="text-sm">Latency: {data.latency}ms</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="accuracy" name="Accuracy" stroke="#22c55e" />
              <Line type="monotone" dataKey="precision" name="Precision" stroke="#3b82f6" />
              <Line type="monotone" dataKey="recall" name="Recall" stroke="#f59e0b" />
              <Line type="monotone" dataKey="f1Score" name="F1 Score" stroke="#8b5cf6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmMetrics; 