export interface Algorithm {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  trainingTime: number;
  parameters: Record<string, any>;
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
  accuracy: number;
  locationName: string;
  locationDetails: LocationDetails | null;
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
