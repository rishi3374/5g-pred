
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { InfoIcon } from 'lucide-react';
import { PerformanceMetric } from '@/types';

interface PerformanceCardProps {
  metric: PerformanceMetric;
}

const PerformanceCard = ({ metric }: PerformanceCardProps) => {
  const { name, value, description } = metric;
  
  const getColorClass = (value: number) => {
    if (value >= 0.9) return 'bg-green-500';
    if (value >= 0.8) return 'bg-blue-500';
    if (value >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="shadow-md feature-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          {name}
          <Tooltip delayDuration={300}>
            <Tooltip.Trigger asChild>
              <button className="ml-1.5">
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top">
              <p className="max-w-xs text-sm">{description}</p>
            </Tooltip.Content>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold">{(value * 100).toFixed(1)}%</span>
        </div>
        <Progress value={value * 100} className="h-2" indicatorClassName={getColorClass(value)} />
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
