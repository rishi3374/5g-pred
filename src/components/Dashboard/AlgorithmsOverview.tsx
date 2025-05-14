import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { algorithms } from '@/data/algorithms';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Shield, Cpu, LineChart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AlgorithmsOverview = () => {
  const performanceData = algorithms.map(algo => ({
    name: algo.name,
    accuracy: algo.accuracy,
    precision: algo.precision,
    recall: algo.recall,
    f1Score: algo.f1Score,
    color: algo.color
  }));

  const getAlgorithmIcon = (id: string) => {
    switch (id) {
      case 'random-forest':
        return <Brain className="h-5 w-5" />;
      case 'xgboost':
        return <Zap className="h-5 w-5" />;
      case 'neural-network':
        return <Cpu className="h-5 w-5" />;
      case 'svm':
        return <Shield className="h-5 w-5" />;
      case 'logistic-regression':
        return <LineChart className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <Card className="shadow-md col-span-2">
      <CardHeader>
        <CardTitle>Algorithms Overview</CardTitle>
        <CardDescription>Comparison of different machine learning algorithms used for 5G coverage prediction</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Algorithm Cards in Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
            {algorithms.map((algo) => (
              <div key={algo.id} className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10" style={{ color: algo.color }}>
                    {getAlgorithmIcon(algo.id)}
                  </div>
                  <div>
                    <h4 className="font-medium" style={{ color: algo.color }}>{algo.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{algo.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/10">Accuracy</Badge>
                    <span className="text-sm font-medium">{(algo.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/10">Precision</Badge>
                    <span className="text-sm font-medium">{(algo.precision * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/10">Recall</Badge>
                    <span className="text-sm font-medium">{(algo.recall * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/10">F1 Score</Badge>
                    <span className="text-sm font-medium">{(algo.f1Score * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Radar</CardTitle>
                <CardDescription>Multi-dimensional performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={120} data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <Radar name="Accuracy" dataKey="accuracy" stroke="#4C51BF" fill="#4C51BF" fillOpacity={0.6} />
                      <Radar name="Precision" dataKey="precision" stroke="#805AD5" fill="#805AD5" fillOpacity={0.6} />
                      <Radar name="Recall" dataKey="recall" stroke="#6B46C1" fill="#6B46C1" fillOpacity={0.6} />
                      <Radar name="F1 Score" dataKey="f1Score" stroke="#9F7AEA" fill="#9F7AEA" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`]} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Metrics Comparison</CardTitle>
                <CardDescription>Side-by-side performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`]} />
                      <Legend />
                      <Bar dataKey="accuracy" name="Accuracy" fill="#4C51BF" />
                      <Bar dataKey="precision" name="Precision" fill="#805AD5" />
                      <Bar dataKey="recall" name="Recall" fill="#6B46C1" />
                      <Bar dataKey="f1Score" name="F1 Score" fill="#9F7AEA" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmsOverview; 