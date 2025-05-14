export interface Algorithm {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  color: string;
  trainingTime: number;
  parameters: {
    [key: string]: string | number | boolean;
  };
}

export interface Feature {
  id: string;
  name: string;
  importance: number;
  description: string;
}

export interface CoverageData {
  id: string;
  x: number;
  y: number;
  altitude: number;
  distanceToTower: number;
  buildingDensity: number;
  vegetationDensity: number;
  signalStrength: number;
  weatherCondition: string;
  frequency: number;
  actualCoverage: boolean;
  predictedCoverage: boolean;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  description: string;
}

export interface ComparisonResult {
  algorithmId: string;
  accuracy: number;
  trainingTime: number;
  inferenceTime: number;
}

export interface LocationDetails {
  locality: string;
  city: string;
  district: string;
  country: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  locationName: string;
  locationType: 'urban' | 'rural' | 'suburban';
  frequencyRange: 'low' | 'medium' | 'high';
  accuracy: number;
  timestamp: string;
}

export interface FrequencyRange {
  min: number;
  max: number;
  band: string;
  accuracy: number;
  description: string;
  range: string;
  speed: string;
}

export interface PredictionResult {
  location: LocationData;
  predictedCoverage: boolean;
  confidence: number;
  algorithm: string;
  timestamp: string;
}

export interface AlgorithmMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latency: number;
  timestamp: string;
}
