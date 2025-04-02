
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('model');
  
  // Form schema for model settings
  const modelFormSchema = z.object({
    primaryAlgorithm: z.string().min(1, "Please select a primary algorithm"),
    thresholdValue: z.number().min(0.5).max(0.95),
    ensembleMode: z.boolean(),
    trainingRatio: z.number().min(0.5).max(0.9),
    crossValidation: z.boolean(),
    hyperparameterTuning: z.boolean(),
  });
  
  const modelForm = useForm<z.infer<typeof modelFormSchema>>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: {
      primaryAlgorithm: 'xgboost',
      thresholdValue: 0.75,
      ensembleMode: true,
      trainingRatio: 0.8,
      crossValidation: true,
      hyperparameterTuning: true,
    },
  });
  
  // Form schema for data settings
  const dataFormSchema = z.object({
    dataSource: z.string().min(1, "Please select a data source"),
    sampleSize: z.number().min(100).max(10000),
    outlierDetection: z.boolean(),
    featureNormalization: z.boolean(),
    augmentData: z.boolean(),
    balanceClasses: z.boolean(),
  });
  
  const dataForm = useForm<z.infer<typeof dataFormSchema>>({
    resolver: zodResolver(dataFormSchema),
    defaultValues: {
      dataSource: 'synthetic',
      sampleSize: 1000,
      outlierDetection: true,
      featureNormalization: true,
      augmentData: false,
      balanceClasses: true,
    },
  });
  
  // Form schema for visualization settings
  const vizFormSchema = z.object({
    colorTheme: z.string().min(1, "Please select a color theme"),
    mapType: z.string().min(1, "Please select a map type"),
    showConfidence: z.boolean(),
    showErrorRegions: z.boolean(),
    animateTransitions: z.boolean(),
    detailedTooltips: z.boolean(),
  });
  
  const vizForm = useForm<z.infer<typeof vizFormSchema>>({
    resolver: zodResolver(vizFormSchema),
    defaultValues: {
      colorTheme: 'purple',
      mapType: 'heatmap',
      showConfidence: true,
      showErrorRegions: true,
      animateTransitions: true,
      detailedTooltips: true,
    },
  });
  
  const onModelSubmit = (data: z.infer<typeof modelFormSchema>) => {
    console.log('Model settings saved:', data);
    toast({
      title: "Settings saved",
      description: "Your model settings have been updated.",
    });
  };
  
  const onDataSubmit = (data: z.infer<typeof dataFormSchema>) => {
    console.log('Data settings saved:', data);
    toast({
      title: "Settings saved",
      description: "Your data settings have been updated.",
    });
  };
  
  const onVizSubmit = (data: z.infer<typeof vizFormSchema>) => {
    console.log('Visualization settings saved:', data);
    toast({
      title: "Settings saved",
      description: "Your visualization settings have been updated.",
    });
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-gray-600">
            Configure your 5G coverage prediction models, data processing, and visualization options.
          </p>
        </div>
        
        <Tabs defaultValue="model" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="model">Model Settings</TabsTrigger>
            <TabsTrigger value="data">Data Settings</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="model" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>Configure prediction algorithm settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...modelForm}>
                  <form onSubmit={modelForm.handleSubmit(onModelSubmit)} className="space-y-6">
                    <FormField
                      control={modelForm.control}
                      name="primaryAlgorithm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Algorithm</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select algorithm" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="xgboost">XGBoost</SelectItem>
                              <SelectItem value="random-forest">Random Forest</SelectItem>
                              <SelectItem value="neural-network">Neural Network</SelectItem>
                              <SelectItem value="svm">Support Vector Machine</SelectItem>
                              <SelectItem value="logistic-regression">Logistic Regression</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The main algorithm used for prediction.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={modelForm.control}
                      name="thresholdValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classification Threshold: {field.value.toFixed(2)}</FormLabel>
                          <FormControl>
                            <Slider
                              min={0.5}
                              max={0.95}
                              step={0.01}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Probability threshold for positive class prediction.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={modelForm.control}
                      name="trainingRatio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Data Ratio: {(field.value * 100).toFixed(0)}%</FormLabel>
                          <FormControl>
                            <Slider
                              min={0.5}
                              max={0.9}
                              step={0.05}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Percentage of data used for training vs. testing.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={modelForm.control}
                        name="ensembleMode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Ensemble Mode</FormLabel>
                              <FormDescription>
                                Combine multiple models for prediction
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={modelForm.control}
                        name="crossValidation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Cross Validation</FormLabel>
                              <FormDescription>
                                Use K-fold cross validation
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={modelForm.control}
                        name="hyperparameterTuning"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Auto Tuning</FormLabel>
                              <FormDescription>
                                Automatic hyperparameter optimization
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Save Model Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Processing</CardTitle>
                <CardDescription>Configure data sources and preprocessing</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...dataForm}>
                  <form onSubmit={dataForm.handleSubmit(onDataSubmit)} className="space-y-6">
                    <FormField
                      control={dataForm.control}
                      name="dataSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Source</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select data source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="synthetic">Synthetic Data</SelectItem>
                              <SelectItem value="real-world">Real-World Measurements</SelectItem>
                              <SelectItem value="simulation">Physics-Based Simulation</SelectItem>
                              <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Source of training and testing data.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={dataForm.control}
                      name="sampleSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sample Size</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={100}
                              max={10000}
                              step={100}
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Number of data points to use (100-10,000).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={dataForm.control}
                        name="outlierDetection"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Outlier Detection</FormLabel>
                              <FormDescription>
                                Remove statistical outliers
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={dataForm.control}
                        name="featureNormalization"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Normalization</FormLabel>
                              <FormDescription>
                                Normalize feature values
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={dataForm.control}
                        name="augmentData"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Data Augmentation</FormLabel>
                              <FormDescription>
                                Generate additional synthetic samples
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={dataForm.control}
                        name="balanceClasses"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Balance Classes</FormLabel>
                              <FormDescription>
                                Ensure equal coverage/no-coverage samples
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Save Data Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visualization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visualization Settings</CardTitle>
                <CardDescription>Configure how prediction results are displayed</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...vizForm}>
                  <form onSubmit={vizForm.handleSubmit(onVizSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={vizForm.control}
                        name="colorTheme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Theme</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select color theme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="purple">Purple & Blue</SelectItem>
                                <SelectItem value="green">Green & Teal</SelectItem>
                                <SelectItem value="red">Red & Orange</SelectItem>
                                <SelectItem value="gray">Grayscale</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Color scheme for visualizations.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={vizForm.control}
                        name="mapType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Map Visualization</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select map type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="heatmap">Heatmap</SelectItem>
                                <SelectItem value="contour">Contour Lines</SelectItem>
                                <SelectItem value="dots">Scatter Plot</SelectItem>
                                <SelectItem value="3d">3D Surface</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How coverage is displayed on maps.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={vizForm.control}
                        name="showConfidence"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Show Confidence</FormLabel>
                              <FormDescription>
                                Display prediction confidence levels
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={vizForm.control}
                        name="showErrorRegions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Error Highlighting</FormLabel>
                              <FormDescription>
                                Highlight misclassified regions
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={vizForm.control}
                        name="animateTransitions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Animations</FormLabel>
                              <FormDescription>
                                Animate transitions between views
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={vizForm.control}
                        name="detailedTooltips"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Detailed Tooltips</FormLabel>
                              <FormDescription>
                                Show comprehensive data in tooltips
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Save Visualization Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
