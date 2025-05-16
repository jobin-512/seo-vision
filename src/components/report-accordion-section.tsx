
'use client';

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import ReportAccordionItem from './report-accordion-item';
import type { OnPageItem } from '@/lib/types'; // Using OnPageItem as a generic structure

interface ReportAccordionSectionProps {
  title: string;
  items: OnPageItem[];
  defaultOpen?: boolean; // If true, the first item will be open by default
}

const ReportAccordionSection: React.FC<ReportAccordionSectionProps> = ({
  title,
  items,
  defaultOpen = false,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-card p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2 text-foreground">{title}</h2>
        <p className="text-muted-foreground">No data available for this section.</p>
      </div>
    );
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-3 text-foreground px-2">{title}</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue={defaultOpen && items[0] ? items[0].title : undefined}>
        {items.map((item) => (
          <ReportAccordionItem key={item.id} {...item} />
        ))}
      </Accordion>
    </div>
  );
};

export default ReportAccordionSection;
