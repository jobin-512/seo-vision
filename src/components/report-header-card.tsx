
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CircularProgressBar from './circular-progress-bar';
import { FileDown, RefreshCw, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { ReportData } from '@/lib/types';
import { format } from 'date-fns';

interface ReportHeaderCardProps {
  reportData: ReportData | null;
  isLoading: boolean;
  onRefresh: () => void;
  onDownloadPdf: () => void;
  urlInput: string;
}

const ReportHeaderCard: React.FC<ReportHeaderCardProps> = ({
  reportData,
  isLoading,
  onRefresh,
  onDownloadPdf,
  urlInput,
}) => {
  const score = reportData?.score ?? 0;
  const urlAnalyzed = reportData?.urlAnalyzed || urlInput || "example.com";
  const analysisTimestamp = reportData?.analysisTimestamp
    ? format(new Date(reportData.analysisTimestamp), 'MMM dd, yyyy h:mm a')
    : format(new Date(), 'MMM dd, yyyy h:mm a');

  const passedPercent = reportData?.passedPercent ?? (score > 0 ? Math.min(score + 10, 70) : 0);
  const toImprovePercent = reportData?.toImprovePercent ?? (score > 0 ? 20 : 0);
  const errorsPercent = reportData?.errorsPercent ?? (score > 0 ? 10 : 0);

  const renderProgressWithLabel = (
    label: string,
    value: number,
    IconComponent: React.ElementType,
    iconColorClass: string,
    progressColorStyle: React.CSSProperties
  ) => (
    <div className="flex items-center space-x-2">
      <IconComponent className={`h-5 w-5 ${iconColorClass}`} />
      <span className="text-sm w-24">{label}</span>
      <Progress value={value} className="flex-1 h-3 status-progress-bar" style={progressColorStyle} />
      <span className="text-sm w-10 text-right">{value}%</span>
    </div>
  );

  return (
    <Card className="w-full report-header-card shadow-lg mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <CircularProgressBar score={score} size={140} strokeWidth={12} />
          <a
            href={urlAnalyzed.startsWith('http') ? urlAnalyzed : `https://${urlAnalyzed}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-primary hover:underline mt-4"
          >
            {urlAnalyzed}
          </a>
          <p className="text-sm text-muted-foreground mt-1">{analysisTimestamp}</p>

          <div className="w-full max-w-md mt-6 space-y-2">
            {renderProgressWithLabel(
              "Passed",
              passedPercent,
              CheckCircle2,
              "text-accent",
              { '--progress-color': 'hsl(var(--accent))' } as React.CSSProperties
            )}
            {renderProgressWithLabel(
              "To Improve",
              toImprovePercent,
              AlertTriangle,
              "text-warning",
              { '--progress-color': 'hsl(var(--warning))' } as React.CSSProperties
            )}
            {renderProgressWithLabel(
              "Errors",
              errorsPercent,
              XCircle,
              "text-destructive",
              { '--progress-color': 'hsl(var(--destructive))' } as React.CSSProperties
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-8 border-t pt-4">
          <Button variant="outline" onClick={onDownloadPdf} disabled={!reportData}>
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={onRefresh} disabled={isLoading} className="bg-primary hover:bg-primary/90 flex-grow ml-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportHeaderCard;
