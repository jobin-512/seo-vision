
'use client';

import React from 'react';
import type { SchemaOrgAnalysis, SchemaTypeBadge, SchemaIssueItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SchemaOrgAccordionContentProps {
  data: SchemaOrgAnalysis;
}

const SchemaOrgAccordionContent: React.FC<SchemaOrgAccordionContentProps> = ({ data }) => {
  const { schemaTypes, issues, warningCount, statusText, statusColorClass } = data;
  const [showAllIssues, setShowAllIssues] = React.useState(false);
  const MAX_ISSUES_VISIBLE_ONSCREEN = 3;


  const getIssueIcon = (severity: 'warning' | 'error') => {
    if (severity === 'error') {
      return <XCircle className="h-4 w-4 text-destructive mr-2 shrink-0" />;
    }
    return <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 shrink-0" />;
  };

  return (
    <div className="space-y-4 text-sm">
      {schemaTypes && schemaTypes.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Schema Types Found:</h4>
          <div className="flex flex-wrap gap-2">
            {schemaTypes.map((type, index) => (
              <Badge key={index} variant="secondary" className="py-1 px-2.5">
                {type.type}
                <span className="ml-1.5 bg-primary text-primary-foreground rounded-full px-1.5 text-[10px] font-mono">
                  {type.count}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {warningCount !== undefined && warningCount > 0 && (
        <p className="font-semibold text-yellow-600 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1.5" />
          {warningCount} Warning{warningCount > 1 ? 's' : ''}
        </p>
      )}
      {warningCount === 0 && statusText && (statusText.toLowerCase().includes("good") || statusText.toLowerCase().includes("perfect")) && (
         <p className="font-semibold text-accent flex items-center">
          <CheckCircle2 className="h-4 w-4 mr-1.5" />
          No warnings found.
        </p>
      )}


      {issues && issues.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Issues:</h4>
          <ul className={`space-y-2 schema-issues-list ${!showAllIssues && issues.length > MAX_ISSUES_VISIBLE_ONSCREEN ? 'collapsed' : ''}`}>
            {issues.map((issue, index) => (
              <li key={index} className={`flex items-start p-2 rounded-md border ${issue.severity === 'error' ? 'border-destructive/30 bg-destructive/5' : 'border-yellow-500/30 bg-yellow-500/5'} issue-item`}>
                {getIssueIcon(issue.severity)}
                <span className={`${issue.severity === 'error' ? 'text-destructive' : 'text-yellow-700 dark:text-yellow-400'}`}>{issue.text}</span>
              </li>
            ))}
          </ul>
          {issues.length > MAX_ISSUES_VISIBLE_ONSCREEN && (
            <Button 
              variant="link" 
              onClick={() => setShowAllIssues(!showAllIssues)} 
              className="mt-2 px-0 h-auto py-1 text-primary show-more-button-schema"
              data-role="show-more-button"
            >
              {showAllIssues ? 'Show less' : `Show more (${issues.length - MAX_ISSUES_VISIBLE_ONSCREEN} more)`}
            </Button>
          )}
        </div>
      )}
      
      {(!schemaTypes || schemaTypes.length === 0) && (!issues || issues.length === 0) && (
         <p className="text-muted-foreground">No specific Schema.org details found or all clear.</p>
      )}
    </div>
  );
};

export default SchemaOrgAccordionContent;
