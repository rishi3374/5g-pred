
export interface Algorithm {
  id: string;
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  description: string;
  color: string;
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
