
'use client';

import React from 'react';
import type { RobotsTxtAnalysis } from '@/lib/types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface RobotsTxtAccordionContentProps {
  data: RobotsTxtAnalysis;
}

const RobotsTxtAccordionContent: React.FC<RobotsTxtAccordionContentProps> = ({ data }) => {
  const { robotsTxtUrl, findings } = data;

  return (
    <div className="space-y-3 text-sm">
      {robotsTxtUrl ? (
        <p>
          <strong>Robots.txt found at:</strong>{' '}
          <a href={robotsTxtUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
            {robotsTxtUrl}
          </a>
        </p>
      ) : (
        <p className="text-muted-foreground">No robots.txt URL provided or found.</p>
      )}

      {findings && findings.length > 0 && (
        <div>
          <h4 className="font-semibold mb-1 text-foreground">Key Findings:</h4>
          <ul className="list-disc list-inside space-y-1 pl-1">
            {findings.map((finding, index) => (
              <li key={index} className="text-muted-foreground">
                {/* Basic check for positive/negative keywords, can be improved */}
                {finding.toLowerCase().includes("allowed") || finding.toLowerCase().includes("found") ? (
                  <CheckCircle2 className="inline-block h-4 w-4 mr-1.5 text-accent" />
                ) : finding.toLowerCase().includes("disallowed") || finding.toLowerCase().includes("missing") ? (
                  <XCircle className="inline-block h-4 w-4 mr-1.5 text-destructive" />
                ) : null}
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}
      {(!findings || findings.length === 0) && <p className="text-muted-foreground">No specific findings available.</p>}
    </div>
  );
};

export default RobotsTxtAccordionContent;
