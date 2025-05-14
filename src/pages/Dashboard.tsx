import React, { useState } from 'react';
import { 
  PerformanceCard, 
  AlgorithmComparisonChart,
  FeatureImportanceChart,
  CoverageMap,
  AlgorithmsOverview,
  AlgorithmCard
} from '@/components/Dashboard';
import LocationAnalysis from '@/components/LocationAnalysis';
import { performanceMetrics, algorithms } from '@/data/algorithms';
import { Algorithm, LocationData } from '@/types';

const Dashboard = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithms[1]); // Default to XGBoost
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleLocationUpdate = (location: LocationData | null) => {
    setSelectedLocation(location);
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">
            5G Coverage Prediction & Feature Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LocationAnalysis onLocationUpdate={handleLocationUpdate} />
          <FeatureImportanceChart selectedLocation={selectedLocation} />
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Algorithms Overview Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-full">
            <AlgorithmsOverview />
          </div>

          {/* Individual Algorithm Cards */}
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="h-full">
              <AlgorithmCard 
                algorithm={algorithm}
                isActive={selectedAlgorithm.id === algorithm.id}
                onClick={() => setSelectedAlgorithm(algorithm)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
