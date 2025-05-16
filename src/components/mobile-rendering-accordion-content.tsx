
'use client';

import React from 'react';
import type { MobileRenderingAnalysis } from '@/lib/types';
import Image from 'next/image';

interface MobileRenderingAccordionContentProps {
  data: MobileRenderingAnalysis;
}

const MobileRenderingAccordionContent: React.FC<MobileRenderingAccordionContentProps> = ({ data }) => {
  const { details } = data;
  const placeholderImageUrl = "https://placehold.co/200x400.png"; // Default placeholder

  return (
    <div className="space-y-3 text-sm flex flex-col md:flex-row md:space-x-4 items-center md:items-start">
      <div className="flex-shrink-0 w-32 md:w-40">
        <Image 
          src={placeholderImageUrl} 
          alt="Mobile rendering placeholder" 
          width={200} 
          height={400} 
          className="rounded-md border"
          data-ai-hint="mobile phone" 
        />
      </div>
      <div className="flex-grow">
        {details ? (
          <p className="text-muted-foreground">{details}</p>
        ) : (
          <p className="text-muted-foreground">No mobile rendering details available.</p>
        )}
      </div>
    </div>
  );
};

export default MobileRenderingAccordionContent;
