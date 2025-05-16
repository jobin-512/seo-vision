
'use client';

import React from 'react';
import type { LocalDirectories, LocalDirectoryLink } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface LocalDirectoriesAccordionContentProps {
  data: LocalDirectories;
}

const LocalDirectoriesAccordionContent: React.FC<LocalDirectoriesAccordionContentProps> = ({ data }) => {
  const { links, statusText, statusColorClass } = data;

  if (!links || links.length === 0) {
    return <p className={`text-sm ${statusColorClass || 'text-muted-foreground'}`}>{statusText || 'No local directory information available.'}</p>;
  }

  return (
    <div className="space-y-3 text-sm">
      {statusText && <p className={`${statusColorClass || 'text-muted-foreground'} mb-2`}>{statusText}</p>}
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Button variant="link" asChild className="p-0 h-auto text-primary hover:underline">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text}
                <ExternalLink className="ml-1.5 h-3 w-3" />
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalDirectoriesAccordionContent;
