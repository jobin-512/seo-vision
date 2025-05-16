
'use client';

import React from 'react';
import type { InPageLinksAnalysis, LinkItem } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface InPageLinksAccordionContentProps {
  data: InPageLinksAnalysis;
}

const InPageLinksAccordionContent: React.FC<InPageLinksAccordionContentProps> = ({ data }) => {
  const { totalLinks, internalLinks, externalLinksFollow, externalLinksNofollow, links, details } = data;

  const chartData = [
    { name: 'Internal Links', value: internalLinks, fill: 'hsl(var(--chart-1))' },
    { name: 'External (Follow)', value: externalLinksFollow, fill: 'hsl(var(--chart-2))' },
    { name: 'External (Nofollow)', value: externalLinksNofollow, fill: 'hsl(var(--chart-3))' },
  ].filter(item => item.value > 0); // Filter out zero values for cleaner chart


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border border-border rounded-md shadow-lg text-xs">
          <p className="font-semibold">{`${payload[0].name}`}</p>
          <p >{`Count: ${payload[0].value}`}</p>
          <p >{`Percentage: ${(payload[0].percent * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="space-y-4">
      {details && <p className="text-sm text-muted-foreground mb-3">{details}</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-center">
        <div className="p-2 border rounded-md bg-muted/50"><div className="text-xs font-semibold text-muted-foreground">Total</div><div className="text-lg font-bold text-foreground">{totalLinks}</div></div>
        <div className="p-2 border rounded-md bg-muted/50"><div className="text-xs font-semibold text-muted-foreground">Internal</div><div className="text-lg font-bold text-foreground">{internalLinks}</div></div>
        <div className="p-2 border rounded-md bg-muted/50"><div className="text-xs font-semibold text-muted-foreground">Ext. Follow</div><div className="text-lg font-bold text-foreground">{externalLinksFollow}</div></div>
        <div className="p-2 border rounded-md bg-muted/50"><div className="text-xs font-semibold text-muted-foreground">Ext. Nofollow</div><div className="text-lg font-bold text-foreground">{externalLinksNofollow}</div></div>
      </div>

      {chartData.length > 0 && totalLinks > 0 && (
        <div className="h-64 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                stroke="hsl(var(--background))"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  if (percent * 100 < 5) return null; // Hide label for small slices
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="10px">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      {totalLinks === 0 && <p className="text-sm text-muted-foreground text-center my-4">No link data available for chart.</p>}


      {links && links.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2 text-foreground">Example Links:</h4>
          <div className="max-h-60 overflow-y-auto border rounded-md p-1">
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>Anchor Text</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Follow Status</TableHead>
                  <TableHead className="hidden md:table-cell">URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.slice(0,15).map((link, index) => (
                  <TableRow key={index}>
                    <TableCell className="break-all max-w-xs truncate">{link.anchorText}</TableCell>
                    <TableCell>
                      <Badge variant={link.type === 'Internal' ? 'outline' : 'secondary'}>{link.type}</Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant={link.followStatus === 'Follow' ? 'default' : (link.followStatus === 'Nofollow' ? 'destructive': 'outline')}
                              className={`${link.followStatus === 'Follow' ? 'bg-accent/80 text-accent-foreground' : ''}`}
                       >
                        {link.followStatus}
                       </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell break-all max-w-xs truncate">
                        <a href={link.url.startsWith('http') ? link.url : `http://${link.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                            {link.url}
                        </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {links.length > 15 && <p className="text-xs text-muted-foreground text-center p-2">Showing first 15 links...</p>}
          </div>
        </div>
      )}
      {(!links || links.length === 0) && <p className="text-sm text-muted-foreground">No example links available.</p>}
    </div>
  );
};

export default InPageLinksAccordionContent;
