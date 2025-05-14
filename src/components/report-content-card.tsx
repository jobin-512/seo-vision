
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ReportContentCardProps {
  title: string;
  content: string;
  Icon?: LucideIcon;
}

export function ReportContentCard({ title, content, Icon }: ReportContentCardProps) {
  const renderContentWithHighlighting = (text: string) => {
    if (!text) return null;
    let currentSection: 'problem' | 'suggestion' | 'other_heading' | 'general' = 'general';
    // Handles both literal "\\n" if it comes from AI and actual newline characters "\n"
    const lines = text.split(/\\n|\n/); 

    return lines.map((line, index) => {
      // Remove all asterisks from the line
      let processedLine = line.replace(/\*/g, '');
      const trimmedLine = processedLine.trim();
      const lowerLine = processedLine.toLowerCase();

      // Section Headers
      if (lowerLine.startsWith("problem:")) {
        currentSection = 'problem';
        return <strong key={index} className="block text-destructive mt-3 mb-1">{processedLine}</strong>;
      }
      if (lowerLine.startsWith("suggestion:")) {
        currentSection = 'suggestion';
        return <strong key={index} className="block text-[hsl(var(--chart-4))] mt-3 mb-1">{processedLine}</strong>;
      }
      
      // Heuristic for other potential subheadings (e.g., "Key Findings:")
      const isPotentialOtherHeading = trimmedLine.endsWith(':') && trimmedLine.length > 0 && trimmedLine.length < 80 && !/^\s*([-+]|\d+\.|[a-zA-Z]\.)\s+/.test(trimmedLine);
      if (isPotentialOtherHeading) {
        currentSection = 'other_heading';
        return <strong key={index} className="block text-primary mt-3 mb-1">{processedLine}</strong>;
      }

      // List Items
      const isListItem = /^\s*([-+]|\d+\.|[a-zA-Z]\.)\s+/.test(trimmedLine);
      if (isListItem) {
        let itemColorClass = "";
        if (currentSection === 'problem') itemColorClass = "text-destructive";
        else if (currentSection === 'suggestion') itemColorClass = "text-[hsl(var(--chart-4))]"; 
        else itemColorClass = "text-foreground"; 
        
        return <span key={index} className={`block ml-4 ${itemColorClass}`}>{processedLine}</span>;
      }

      // Empty Lines
      if (trimmedLine === '') {
        return <br key={index} />;
      }
      
      // General content lines
      let lineColorClass = "";
      if (currentSection === 'problem') lineColorClass = "text-destructive";
      else if (currentSection === 'suggestion') lineColorClass = "text-[hsl(var(--chart-4))]";
      else lineColorClass = "text-foreground";

      return (
        <span key={index} className={`block ${lineColorClass}`}>
          {processedLine}
        </span>
      );
    });
  };

  return (
    <Card className="shadow-lg report-content-card">
      <CardHeader>
        <CardTitle className="flex items-center text-xl" style={{ color: 'hsl(var(--primary))' }}>
          {Icon && <Icon className="mr-2 h-6 w-6" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-none whitespace-pre-wrap text-sm">
          {renderContentWithHighlighting(content)}
        </div>
      </CardContent>
    </Card>
  );
}
