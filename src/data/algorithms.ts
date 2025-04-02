
import { Algorithm, Feature, ComparisonResult } from '../types';

export const algorithms: Algorithm[] = [
  {
    id: 'random-forest',
    name: 'Random Forest',
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.92,
    f1Score: 0.89,
    description: 'An ensemble learning method that operates by constructing multiple decision trees during training and outputting the class that is the mode of the classes of the individual trees.',
    color: '#4C51BF'
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    accuracy: 0.92,
    precision: 0.91,
    recall: 0.93,
    f1Score: 0.92,
    description: 'An optimized distributed gradient boosting library designed to be highly efficient, flexible and portable.',
    color: '#805AD5'
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    accuracy: 0.90,
    precision: 0.88,
    recall: 0.91,
    f1Score: 0.89,
    description: 'A deep learning model that uses multiple layers of interconnected nodes to process and learn from complex data patterns.',
    color: '#6B46C1'
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    accuracy: 0.85,
    precision: 0.84,
    recall: 0.87,
    f1Score: 0.85,
    description: 'A supervised learning model that analyzes data for classification and regression analysis.',
    color: '#9F7AEA'
  },
  {
    id: 'logistic-regression',
    name: 'Logistic Regression',
    accuracy: 0.82,
    precision: 0.80,
    recall: 0.83,
    f1Score: 0.81,
    description: 'A statistical model that uses a logistic function to model a binary dependent variable.',
    color: '#B794F4'
  }
];

export const features: Feature[] = [
  {
    id: 'distance',
    name: 'Distance to Tower',
    importance: 0.27,
    description: 'The physical distance between the user and the nearest 5G tower, measured in meters.'
  },
  {
    id: 'buildings',
    name: 'Building Density',
    importance: 0.21,
    description: 'The density of buildings in the area, which can obstruct signal propagation.'
  },
  {
    id: 'altitude',
    name: 'Altitude',
    importance: 0.18,
    description: 'The elevation of the location above sea level, affecting line-of-sight to towers.'
  },
  {
    id: 'vegetation',
    name: 'Vegetation Density',
    importance: 0.14,
    description: 'The amount and type of vegetation in the area, which can attenuate signals.'
  },
  {
    id: 'weather',
    name: 'Weather Conditions',
    importance: 0.11,
    description: 'Current weather conditions like rain or fog, which can affect signal propagation.'
  },
  {
    id: 'frequency',
    name: 'Frequency Band',
    importance: 0.09,
    description: 'The specific frequency band of the 5G signal, affecting penetration and range.'
  }
];

export const comparisonResults: ComparisonResult[] = [
  { algorithmId: 'random-forest', accuracy: 0.89, trainingTime: 45.2, inferenceTime: 3.2 },
  { algorithmId: 'xgboost', accuracy: 0.92, trainingTime: 62.7, inferenceTime: 4.1 },
  { algorithmId: 'neural-network', accuracy: 0.90, trainingTime: 128.5, inferenceTime: 5.8 },
  { algorithmId: 'svm', accuracy: 0.85, trainingTime: 78.3, inferenceTime: 4.9 },
  { algorithmId: 'logistic-regression', accuracy: 0.82, trainingTime: 23.6, inferenceTime: 2.1 }
];

export const generateSampleData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const distanceToTower = Math.random() * 5000;
    const buildingDensity = Math.random();
    const vegetationDensity = Math.random();
    const altitude = Math.random() * 500;
    const frequency = 24 + Math.random() * 6; // 24-30 GHz
    
    // Determine actual coverage based on a complex combination of factors
    const actualCoverage = (
      distanceToTower < 2000 &&
      buildingDensity < 0.7 &&
      (altitude > 100 || vegetationDensity < 0.5)
    ) || (
      distanceToTower < 1000 &&
      frequency > 26
    );
    
    // Simulated prediction with some error
    const predictError = Math.random() < 0.1; // 10% error rate
    const predictedCoverage = predictError ? !actualCoverage : actualCoverage;
    
    data.push({
      id: `data-${i}`,
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      altitude,
      distanceToTower,
      buildingDensity,
      vegetationDensity,
      signalStrength: actualCoverage ? 70 + Math.random() * 30 : Math.random() * 60,
      weatherCondition: Math.random() > 0.7 ? 'Rainy' : 'Clear',
      frequency,
      actualCoverage,
      predictedCoverage
    });
  }
  return data;
};

export const performanceMetrics = [
  {
    name: 'Overall Accuracy',
    value: 0.92,
    description: 'The proportion of correctly classified instances among the total instances.'
  },
  {
    name: 'Precision',
    value: 0.91,
    description: 'The ratio of correctly predicted positive observations to the total predicted positives.'
  },
  {
    name: 'Recall',
    value: 0.93,
    description: 'The ratio of correctly predicted positive observations to all observations in the actual class.'
  },
  {
    name: 'F1 Score',
    value: 0.92,
    description: 'The harmonic mean of precision and recall, providing a balance between the two.'
  }
];
