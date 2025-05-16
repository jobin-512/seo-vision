
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react'; // Or any relevant icon

interface GooglePreviewCardProps {
  type: 'Desktop' | 'Mobile';
  url: string;
  title: string;
  description: string;
}

const GooglePreviewCard: React.FC<GooglePreviewCardProps> = ({
  type,
  url,
  title,
  description,
}) => {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className={`p-3 border rounded-lg shadow-sm bg-background ${type === 'Mobile' ? 'max-w-xs' : ''}`}>
      <div className="flex items-center text-xs text-muted-foreground mb-1">
        <Globe className="h-3 w-3 mr-1.5" />
        <span>{displayUrl}</span>
      </div>
      <h3 className="text-base text-blue-700 group-hover:underline font-medium truncate mb-0.5">{title}</h3>
      <p className="text-xs text-muted-foreground leading-snug">
        {description}
      </p>
    </div>
  );
};

export default GooglePreviewCard;
