
'use client';

import React from 'react';
import type { DiscoveredProfiles, SocialProfile } from '@/lib/types';
import { Link as LinkIcon, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react'; // Assuming these icons exist
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DiscoveredProfilesAccordionContentProps {
  data: DiscoveredProfiles;
}

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  const lowerPlatform = platform.toLowerCase();
  if (lowerPlatform.includes('facebook')) return <Facebook className="h-4 w-4 mr-2 text-blue-600" />;
  if (lowerPlatform.includes('twitter')) return <Twitter className="h-4 w-4 mr-2 text-sky-500" />;
  if (lowerPlatform.includes('instagram')) return <Instagram className="h-4 w-4 mr-2 text-pink-500" />;
  if (lowerPlatform.includes('linkedin')) return <Linkedin className="h-4 w-4 mr-2 text-blue-700" />;
  return <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />;
};


const DiscoveredProfilesAccordionContent: React.FC<DiscoveredProfilesAccordionContentProps> = ({ data }) => {
  const { profiles, summaryText, statusText, statusColorClass } = data;

  return (
    <div className="space-y-3 text-sm">
      {summaryText && <p className={`mb-2 ${statusColorClass || 'text-muted-foreground'}`}>{summaryText}</p>}
      
      {profiles && profiles.length > 0 ? (
        <ul className="space-y-2">
          {profiles.map((profile, index) => (
            <li key={index} className="flex items-center p-2 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
              <PlatformIcon platform={profile.platform} />
              <a 
                href={profile.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline break-all flex-grow"
              >
                {profile.url}
              </a>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-2 shrink-0" />
            </li>
          ))}
        </ul>
      ) : statusText && (!summaryText || (profiles && profiles.length === 0)) ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">No discovered profiles found or data unavailable.</p>
      )}
       {!profiles && !summaryText && !statusText && <p className="text-muted-foreground">Discovered profiles information unavailable.</p>}
    </div>
  );
};

export default DiscoveredProfilesAccordionContent;
