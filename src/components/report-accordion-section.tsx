
'use client';

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import ReportAccordionItem from './report-accordion-item';
import type { OnPageItem } from '@/lib/types'; // Using OnPageItem as a generic structure

interface ReportAccordionSectionProps {
  title: string;
  items: OnPageItem[];
  defaultOpen?: boolean; // This prop is no longer strictly needed as all items will be open
}

const ReportAccordionSection: React.FC<ReportAccordionSectionProps> = ({
  title,
  items,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-card p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2 text-foreground">{title}</h2>
        <p className="text-muted-foreground">No data available for this section.</p>
      </div>
    );
  }

  // Make all items open by default
  const defaultValues = items.map(item => item.title);

  return (
    <div className="bg-card p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-3 text-foreground px-2">{title}</h2>
      <Accordion 
        type="multiple" 
        className="w-full" 
        defaultValue={defaultValues}
      >
        {items.map((item) => (
          // Pass item.title as the value for AccordionItem
          <ReportAccordionItem key={item.id} {...item} value={item.title} />
        ))}
      </Accordion>
    </div>
  );
};

export default ReportAccordionSection;

