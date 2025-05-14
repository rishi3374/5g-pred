import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart3, PieChart, Activity } from 'lucide-react';

const AlgorithmDetails = () => {
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-bold text-primary mb-2">Algorithm Details</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-2">
          <TabsTrigger value="overview" className="flex items-center gap-1 text-xs py-1">
            <Activity className="h-3 w-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1 text-xs py-1">
            <LineChart className="h-3 w-3" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1 text-xs py-1">
            <BarChart3 className="h-3 w-3" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-1 text-xs py-1">
            <PieChart className="h-3 w-3" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="shadow-sm">
            <CardHeader className="pb-1 pt-2">
              <CardTitle className="text-base">Algorithm Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-primary">Description</h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    Our 5G prediction system uses advanced machine learning with neural networks 
                    and ensemble methods to process network parameters and environmental factors.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-primary">Key Components</h3>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="p-1 bg-gray-50 rounded text-xs">
                      <h4 className="font-semibold">Neural Network</h4>
                      <ul className="text-gray-600 list-disc list-inside">
                        <li>Multiple layers</li>
                        <li>ReLU activation</li>
                        <li>Dropout layers</li>
                      </ul>
                    </div>
                    <div className="p-1 bg-gray-50 rounded text-xs">
                      <h4 className="font-semibold">Features</h4>
                      <ul className="text-gray-600 list-disc list-inside">
                        <li>Signal strength</li>
                        <li>Environmental data</li>
                        <li>Historical data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-1 bg-gray-50 rounded text-xs">
                  <h4 className="font-semibold">Model Parameters</h4>
                  <ul className="text-gray-600 list-disc list-inside">
                    <li>Features: 15</li>
                    <li>Layers: 3</li>
                    <li>Neurons: 64</li>
                    <li>LR: 0.001</li>
                  </ul>
                </div>
                <div className="p-1 bg-gray-50 rounded text-xs">
                  <h4 className="font-semibold">Training Data</h4>
                  <ul className="text-gray-600 list-disc list-inside">
                    <li>Samples: 10K</li>
                    <li>Train: 70%</li>
                    <li>Val: 15%</li>
                    <li>Test: 15%</li>
                  </ul>
                </div>
                <div className="p-1 bg-gray-50 rounded text-xs">
                  <h4 className="font-semibold">Performance</h4>
                  <ul className="text-gray-600 list-disc list-inside">
                    <li>Accuracy: 95%</li>
                    <li>MAE: 0.02</li>
                    <li>RMSE: 0.03</li>
                    <li>R²: 0.94</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="shadow-sm">
            <CardHeader className="pb-1 pt-2">
              <CardTitle className="text-base">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-xs">Performance metrics and charts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card className="shadow-sm">
            <CardHeader className="pb-1 pt-2">
              <CardTitle className="text-base">Algorithm Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-xs">Comparison charts and analysis will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="shadow-sm">
            <CardHeader className="pb-1 pt-2">
              <CardTitle className="text-base">Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-xs">Detailed analysis and insights will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlgorithmDetails; 