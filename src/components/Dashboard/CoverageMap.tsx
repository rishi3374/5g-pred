
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateSampleData } from '@/data/algorithms';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CoverageMap = () => {
  const [data, setData] = useState(generateSampleData(100));
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('xgboost');
  
  const algorithms = [
    { id: 'xgboost', name: 'XGBoost' },
    { id: 'random-forest', name: 'Random Forest' },
    { id: 'neural-network', name: 'Neural Network' },
    { id: 'svm', name: 'Support Vector Machine' },
    { id: 'logistic-regression', name: 'Logistic Regression' }
  ];
  
  // Regenerate data when algorithm changes to simulate different predictions
  useEffect(() => {
    setData(generateSampleData(100));
  }, [selectedAlgorithm]);
  
  const truePositives = data.filter(point => point.actualCoverage && point.predictedCoverage);
  const falsePositives = data.filter(point => !point.actualCoverage && point.predictedCoverage);
  const trueNegatives = data.filter(point => !point.actualCoverage && !point.predictedCoverage);
  const falseNegatives = data.filter(point => point.actualCoverage && !point.predictedCoverage);

  return (
    <Card className="shadow-md col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Coverage Prediction Map</CardTitle>
            <CardDescription>
              Visualization of actual vs predicted coverage
            </CardDescription>
          </div>
          <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map(algo => (
                <SelectItem key={algo.id} value={algo.id}>{algo.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" dataKey="x" name="X Coordinate" unit="m" />
              <YAxis type="number" dataKey="y" name="Y Coordinate" unit="m" />
              <ZAxis
                type="number"
                dataKey="distanceToTower"
                range={[20, 200]}
                name="Distance to Tower"
                unit="m"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [name === 'Z' ? `${value}m` : value, name]}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded-md shadow-md">
                        <p className="font-bold">{data.actualCoverage ? 'Has Coverage' : 'No Coverage'}</p>
                        <p>Distance to Tower: {data.distanceToTower.toFixed(0)}m</p>
                        <p>Building Density: {(data.buildingDensity * 100).toFixed(0)}%</p>
                        <p>Altitude: {data.altitude.toFixed(0)}m</p>
                        <p>Signal Strength: {data.signalStrength.toFixed(1)} dBm</p>
                        <p className={`font-bold ${data.actualCoverage === data.predictedCoverage ? 'text-green-600' : 'text-red-600'}`}>
                          Prediction: {data.predictedCoverage ? 'Coverage' : 'No Coverage'}
                          {data.actualCoverage === data.predictedCoverage ? ' (Correct)' : ' (Incorrect)'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter
                name="True Positive (Correctly Predicted Coverage)"
                data={truePositives}
                fill="#4C51BF"
              />
              <Scatter
                name="False Positive (Incorrectly Predicted Coverage)"
                data={falsePositives}
                fill="#E53E3E"
              />
              <Scatter
                name="True Negative (Correctly Predicted No Coverage)"
                data={trueNegatives}
                fill="#718096"
              />
              <Scatter
                name="False Negative (Missed Coverage)"
                data={falseNegatives}
                fill="#F6AD55"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverageMap;
