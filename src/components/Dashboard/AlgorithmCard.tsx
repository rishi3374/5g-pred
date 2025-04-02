
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BadgeCheck, Clock } from 'lucide-react';
import { Algorithm } from '@/types';

interface AlgorithmCardProps {
  algorithm: Algorithm;
  isActive?: boolean;
  onClick?: () => void;
}

const AlgorithmCard = ({ algorithm, isActive = false, onClick }: AlgorithmCardProps) => {
  const { name, accuracy, precision, recall, f1Score, description, color } = algorithm;
  
  return (
    <Card 
      className={`shadow-md cursor-pointer feature-card transition-all ${
        isActive ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
      style={{ borderTop: `3px solid ${color}` }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          {name}
          {isActive && <BadgeCheck className="ml-2 h-5 w-5 text-primary" />}
        </CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Accuracy</p>
            <p className="font-medium">{(accuracy * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Precision</p>
            <p className="font-medium">{(precision * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Recall</p>
            <p className="font-medium">{(recall * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">F1 Score</p>
            <p className="font-medium">{(f1Score * 100).toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmCard;
