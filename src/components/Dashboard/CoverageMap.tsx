import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateSampleData } from '@/data/algorithms';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

  // Convert scatter data to grid data
  const createGridData = () => {
    const gridSize = 20;
    const gridData = [];
    
    // Initialize grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        gridData.push({
          x,
          y,
          value: 0,
          count: 0,
          actualCoverage: false,
          predictedCoverage: false
        });
      }
    }
    
    // Aggregate data points into grid cells
    data.forEach(point => {
      const x = Math.floor((point.x / 1000) * gridSize);
      const y = Math.floor((point.y / 1000) * gridSize);
      const index = y * gridSize + x;
      
      if (index >= 0 && index < gridData.length) {
        gridData[index].value += point.signalStrength;
        gridData[index].count += 1;
        gridData[index].actualCoverage = point.actualCoverage;
        gridData[index].predictedCoverage = point.predictedCoverage;
      }
    });
    
    // Calculate average signal strength for each cell
    return gridData.map(cell => ({
      ...cell,
      value: cell.count > 0 ? cell.value / cell.count : 0
    }));
  };

  const gridData = createGridData();

  return (
    <Card className="shadow-md col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Coverage Prediction Map</CardTitle>
            <CardDescription>
              Grid-based visualization of 5G coverage prediction
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
            <div className="relative w-full h-full">
              <svg width="100%" height="100%">
                {gridData.map((cell, index) => {
                  const cellWidth = 100 / 20; // 20 is gridSize
                  const cellHeight = 100 / 20;
                  const x = cell.x * cellWidth;
                  const y = cell.y * cellHeight;
                  const isCorrect = cell.actualCoverage === cell.predictedCoverage;
                  const hasCoverage = cell.actualCoverage;
                  
                  return (
                    <g key={index}>
                      <rect
                        x={`${x}%`}
                        y={`${y}%`}
                        width={`${cellWidth}%`}
                        height={`${cellHeight}%`}
                        fill={hasCoverage ? 
                          (isCorrect ? 'rgba(76, 81, 191, 0.7)' : 'rgba(229, 62, 62, 0.7)') :
                          (isCorrect ? 'rgba(72, 187, 120, 0.7)' : 'rgba(245, 158, 11, 0.7)')
                        }
                        stroke="#fff"
                        strokeWidth={1}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        data-tooltip-content={JSON.stringify({
                          actualCoverage: cell.actualCoverage,
                          predictedCoverage: cell.predictedCoverage,
                          value: cell.value,
                          count: cell.count
                        })}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#4C51BF] mr-2"></div>
            <span>Correct Coverage Prediction</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#E53E3E] mr-2"></div>
            <span>Incorrect Coverage Prediction</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#48BB78] mr-2"></div>
            <span>Correct No Coverage</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#F59E0B] mr-2"></div>
            <span>Incorrect No Coverage</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverageMap;
