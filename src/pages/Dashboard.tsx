
import React, { useState } from 'react';
import { 
  PerformanceCard, 
  AlgorithmComparisonChart,
  FeatureImportanceChart,
  CoverageMap,
  TrainingTimeChart,
  AlgorithmCard
} from '@/components/Dashboard';
import LocationAnalysis from '@/components/LocationAnalysis';
import { performanceMetrics, algorithms } from '@/data/algorithms';
import { Algorithm } from '@/types';

const Dashboard = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithms[1]); // Default to XGBoost

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">
            5G Coverage Prediction & Feature Analysis
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Analyze prediction accuracy and identify dominant feature parameters affecting 5G network coverage using various machine learning algorithms.
          </p>
        </div>
        
        {/* Top Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {performanceMetrics.map((metric) => (
            <PerformanceCard key={metric.name} metric={metric} />
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <CoverageMap />
          <FeatureImportanceChart />
          <LocationAnalysis />
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <TrainingTimeChart />
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {algorithms.map((algorithm) => (
              <AlgorithmCard 
                key={algorithm.id}
                algorithm={algorithm}
                isActive={selectedAlgorithm.id === algorithm.id}
                onClick={() => setSelectedAlgorithm(algorithm)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
