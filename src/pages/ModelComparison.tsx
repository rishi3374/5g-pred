import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { algorithms, comparisonResults } from '@/data/algorithms';

const ModelComparison = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const accuracyData = algorithms.map(algo => ({
    name: algo.name,
    accuracy: algo.accuracy * 100,
    precision: algo.precision * 100,
    recall: algo.recall * 100,
    f1: algo.f1Score * 100,
    color: algo.color
  }));

  const performanceData = algorithms.map(algo => ({
    name: algo.name,
    accuracy: algo.accuracy,
    precision: algo.precision,
    recall: algo.recall,
    f1Score: algo.f1Score,
    color: algo.color
  }));

  const timeData = comparisonResults.map(result => {
    const algorithm = algorithms.find(a => a.id === result.algorithmId);
    return {
      name: algorithm?.name || result.algorithmId,
      trainingTime: result.trainingTime,
      inferenceTime: result.inferenceTime,
      color: algorithm?.color
    };
  });

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Model Comparison</h1>
          <p className="text-gray-600 max-w-3xl">
            Compare the performance, accuracy, and efficiency of different machine learning models for 5G coverage prediction.
          </p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accuracy">Accuracy Metrics</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
            <TabsTrigger value="time">Time Efficiency</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Models Summary</CardTitle>
                <CardDescription>Comparison of all machine learning models used for 5G coverage prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Algorithm</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Precision</TableHead>
                      <TableHead>Recall</TableHead>
                      <TableHead>F1 Score</TableHead>
                      <TableHead>Training Time</TableHead>
                      <TableHead>Inference Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {algorithms.map((algo) => {
                      const timeData = comparisonResults.find(r => r.algorithmId === algo.id);
                      return (
                        <TableRow key={algo.id}>
                          <TableCell className="font-medium" style={{color: algo.color}}>{algo.name}</TableCell>
                          <TableCell>{(algo.accuracy * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(algo.precision * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(algo.recall * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(algo.f1Score * 100).toFixed(1)}%</TableCell>
                          <TableCell>{timeData?.trainingTime.toFixed(1)}s</TableCell>
                          <TableCell>{timeData?.inferenceTime.toFixed(1)}s</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Accuracy Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={accuracyData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => {
                          return typeof value === 'number' ? [`${value.toFixed(1)}%`] : [value];
                        }} />
                        <Legend />
                        <Bar dataKey="accuracy" name="Accuracy" fill="#4C51BF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Time Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'seconds', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => {
                          return typeof value === 'number' ? [`${value.toFixed(1)}s`] : [value];
                        }} />
                        <Legend />
                        <Bar dataKey="trainingTime" name="Training Time" fill="#805AD5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Precision-Recall Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={accuracyData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[70, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => {
                          return typeof value === 'number' ? [`${value.toFixed(1)}%`] : [value];
                        }} />
                        <Legend />
                        <Line type="monotone" dataKey="precision" name="Precision" stroke="#805AD5" strokeWidth={2} dot={{ r: 6 }} />
                        <Line type="monotone" dataKey="recall" name="Recall" stroke="#6B46C1" strokeWidth={2} dot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>F1 Score Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={accuracyData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[70, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => {
                          return typeof value === 'number' ? [`${value.toFixed(1)}%`] : [value];
                        }} />
                        <Legend />
                        <Bar dataKey="f1" name="F1 Score" fill="#9F7AEA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Radar Chart of Accuracy Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 1]} tickFormatter={(value) => {
                        return typeof value === 'number' ? `${(value * 100).toFixed(0)}%` : value;
                      }} />
                      <Radar name="Accuracy" dataKey="accuracy" stroke="#4C51BF" fill="#4C51BF" fillOpacity={0.6} />
                      <Radar name="Precision" dataKey="precision" stroke="#805AD5" fill="#805AD5" fillOpacity={0.6} />
                      <Radar name="Recall" dataKey="recall" stroke="#6B46C1" fill="#6B46C1" fillOpacity={0.6} />
                      <Radar name="F1 Score" dataKey="f1Score" stroke="#9F7AEA" fill="#9F7AEA" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip formatter={(value) => {
                        return typeof value === 'number' ? [`${(value * 100).toFixed(1)}%`] : [value];
                      }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={algorithms}
                          dataKey="accuracy"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          label={({ name, accuracy }) => {
                            return typeof accuracy === 'number' 
                              ? `${name}: ${(accuracy * 100).toFixed(1)}%` 
                              : `${name}: ${accuracy}%`;
                          }}
                        >
                          {algorithms.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => {
                          return typeof value === 'number' ? [`${(value * 100).toFixed(1)}%`, 'Accuracy'] : [value, 'Accuracy'];
                        }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Balanced Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                        <XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                        <YAxis type="category" dataKey="name" width={120} />
                        <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`]} />
                        <Legend />
                        <Bar dataKey="accuracy" name="Accuracy" stackId="a" fill="#4C51BF" />
                        <Bar dataKey="precision" name="Precision" stackId="b" fill="#805AD5" />
                        <Bar dataKey="recall" name="Recall" stackId="c" fill="#6B46C1" />
                        <Bar dataKey="f1Score" name="F1 Score" stackId="d" fill="#9F7AEA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Algorithm</TableHead>
                      <TableHead>True Positive Rate</TableHead>
                      <TableHead>True Negative Rate</TableHead>
                      <TableHead>False Positive Rate</TableHead>
                      <TableHead>False Negative Rate</TableHead>
                      <TableHead>AUC-ROC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {algorithms.map((algo) => (
                      <TableRow key={algo.id}>
                        <TableCell className="font-medium" style={{color: algo.color}}>{algo.name}</TableCell>
                        <TableCell>{(algo.recall * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(0.85 + Math.random() * 0.1).toFixed(2) * 100}%</TableCell>
                        <TableCell>{(0.05 + Math.random() * 0.1).toFixed(2) * 100}%</TableCell>
                        <TableCell>{((1 - algo.recall) * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(0.9 + Math.random() * 0.09).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Efficiency</CardTitle>
                <CardDescription>Compare training and inference time for different algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => {
                        return typeof value === 'number' ? [`${value.toFixed(1)}s`] : [value];
                      }} />
                      <Legend />
                      <Bar dataKey="trainingTime" name="Training Time" fill="#805AD5" />
                      <Bar dataKey="inferenceTime" name="Inference Time" fill="#D6BCFA" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Time vs Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={comparisonResults.map(result => {
                          const algorithm = algorithms.find(a => a.id === result.algorithmId);
                          return {
                            name: algorithm?.name || result.algorithmId,
                            trainingTime: result.trainingTime,
                            accuracy: result.accuracy * 100,
                            color: algorithm?.color
                          };
                        })}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="trainingTime" label={{ value: 'Training Time (s)', position: 'insideBottom', offset: -5 }} />
                        <YAxis domain={[80, 95]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip 
                          formatter={(value, name) => {
                            if (name === 'accuracy') return [`${value.toFixed(1)}%`, 'Accuracy'];
                            return [`${value.toFixed(1)}s`, 'Training Time'];
                          }}
                          labelFormatter={(value) => `Training Time: ${value}s`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          name="Accuracy"
                          stroke="#4C51BF"
                          strokeWidth={2}
                          dot={{ r: 6, fill: '#4C51BF' }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Efficiency Ratio</CardTitle>
                  <CardDescription>Accuracy per second of training</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonResults.map(result => {
                          const algorithm = algorithms.find(a => a.id === result.algorithmId);
                          return {
                            name: algorithm?.name || result.algorithmId,
                            efficiencyRatio: (result.accuracy * 100) / result.trainingTime,
                            color: algorithm?.color
                          };
                        }).sort((a, b) => b.efficiencyRatio - a.efficiencyRatio)}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Accuracy % per second', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => {
                          return typeof value === 'number' ? [`${value.toFixed(2)}`] : [value];
                        }} />
                        <Bar 
                          dataKey="efficiencyRatio" 
                          name="Efficiency Ratio" 
                          fill="#805AD5"
                          radius={[4, 4, 0, 0]}
                        >
                          {comparisonResults.map((entry, index) => {
                            const algorithm = algorithms.find(a => a.id === entry.algorithmId);
                            return <Cell key={`cell-${index}`} fill={algorithm?.color || '#805AD5'} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModelComparison;
