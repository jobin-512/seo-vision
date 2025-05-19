
'use client';

import React from 'react';
import type { SocialAccountDetails } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Facebook, Twitter, Instagram, Linkedin, AlertCircle } from 'lucide-react';

interface SocialAccountAccordionContentProps {
  data: SocialAccountDetails;
}

const PlatformIcon: React.FC<{ platform: string, className?: string }> = ({ platform, className }) => {
  const lowerPlatform = platform.toLowerCase();
  const iconProps = { className: `h-6 w-6 ${className}` };
  if (lowerPlatform.includes('facebook')) return <Facebook {...iconProps} />;
  if (lowerPlatform.includes('twitter')) return <Twitter {...iconProps} />;
  if (lowerPlatform.includes('instagram')) return <Instagram {...iconProps} />;
  if (lowerPlatform.includes('linkedin')) return <Linkedin {...iconProps} />;
  return <AlertCircle {...iconProps} />; // Fallback icon
};

const SocialAccountAccordionContent: React.FC<SocialAccountAccordionContentProps> = ({ data }) => {
  const { platform, url, name, found, statusText, statusColorClass } = data;

  const platformSpecificLinks = {
    Facebook: { add: 'https://www.facebook.com/pages/creation/', create: 'https://www.facebook.com/pages/creation/' },
    Twitter: { add: 'https://twitter.com/i/flow/signup', create: 'https://twitter.com/i/flow/signup' },
    Instagram: { add: 'https://www.instagram.com/accounts/emailsignup/', create: 'https://www.instagram.com/accounts/emailsignup/' },
    LinkedIn: { add: 'https://www.linkedin.com/company/setup/new/', create: 'https://www.linkedin.com/company/setup/new/' },
  };

  const links = platformSpecificLinks[platform as keyof typeof platformSpecificLinks] || { add: '#', create: '#' };

  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center mb-2">
        <PlatformIcon platform={platform} className={`mr-2 ${statusColorClass || 'text-muted-foreground'}`} />
        <h3 className={`text-base font-semibold ${statusColorClass || 'text-foreground'}`}>{platform} Account</h3>
      </div>

      {found && url ? (
        <div className="space-y-1">
          <p>
            <strong className="text-foreground">URL:</strong>{' '}
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
              {url} <ExternalLink className="inline-block h-3 w-3 ml-1" />
            </a>
          </p>
          {name && <p><strong className="text-foreground">Name:</strong> {name}</p>}
           <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
             <a href={url} target="_blank" rel="noopener noreferrer">Change Account</a>
           </Button>
        </div>
      ) : (
        <div>
          <p className={`${statusColorClass || 'text-muted-foreground'} mb-1`}>{statusText || 'Not found'}</p>
          <div className="flex space-x-2">
            <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
              <a href={links.add} target="_blank" rel="noopener noreferrer">Add your {platform} account</a>
            </Button>
            <span className="text-muted-foreground">or</span>
            <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
              <a href={links.create} target="_blank" rel="noopener noreferrer">create one</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialAccountAccordionContent;
