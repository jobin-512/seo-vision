
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
      const trimmedLine = line.trim();
      const lowerLine = line.toLowerCase();

      // Section Headers
      if (lowerLine.startsWith("problem:")) {
        currentSection = 'problem';
        return <strong key={index} className="block text-destructive mt-3 mb-1">{line}</strong>;
      }
      if (lowerLine.startsWith("suggestion:")) {
        currentSection = 'suggestion';
        return <strong key={index} className="block text-accent mt-3 mb-1">{line}</strong>;
      }
      
      // Heuristic for other potential subheadings (e.g., "Key Findings:")
      // Recognizes lines ending with a colon, not too long, and not list items.
      const isPotentialOtherHeading = trimmedLine.endsWith(':') && trimmedLine.length > 0 && trimmedLine.length < 80 && !/^\s*([-*+]|\d+\.|[a-zA-Z]\.)\s+/.test(trimmedLine);
      if (isPotentialOtherHeading) {
        currentSection = 'other_heading';
        return <strong key={index} className="block text-primary mt-3 mb-1">{line}</strong>;
      }

      // List Items
      const isListItem = /^\s*([-*+]|\d+\.|[a-zA-Z]\.)\s+/.test(trimmedLine);
      if (isListItem) {
        let itemColorClass = "";
        if (currentSection === 'problem') itemColorClass = "text-destructive";
        else if (currentSection === 'suggestion') itemColorClass = "text-accent";
        // For list items under 'other_heading' (primary) or 'general', use foreground for better readability of content.
        else itemColorClass = "text-foreground"; 
        
        return <span key={index} className={`block ml-4 ${itemColorClass}`}>{line}</span>;
      }

      // Empty Lines
      if (trimmedLine === '') {
        // currentSection = 'general'; // Optionally reset section on blank lines if desired for stricter context. For now, context persists.
        return <br key={index} />;
      }
      
      // General content lines
      let lineColorClass = "";
      if (currentSection === 'problem') lineColorClass = "text-destructive";
      else if (currentSection === 'suggestion') lineColorClass = "text-accent";
      // Content under 'other_heading' (primary) or 'general' sections uses foreground color.
      else lineColorClass = "text-foreground";

      return (
        <span key={index} className={`block ${lineColorClass}`}>
          {line}
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
        {/* Removed prose classes for more direct control with Tailwind utilities. Base text size, colors handled by spans. */}
        <div className="max-w-none whitespace-pre-wrap text-sm">
          {renderContentWithHighlighting(content)}
        </div>
      </CardContent>
    </Card>
  );
}
