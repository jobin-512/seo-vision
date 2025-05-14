
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
    return text.split('\\n').map((line, index) => {
      if (line.toLowerCase().startsWith("problem:")) {
        return (
          <span key={index} className="block text-destructive">
            {line}
          </span>
        );
      }
      if (line.toLowerCase().startsWith("suggestion:")) {
        return (
          <span key={index} className="block text-accent">
            {line}
          </span>
        );
      }
      // For lines that are part of a list under "Problems" or "Suggestions"
      // This is a simple check, might need refinement based on actual report structure
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        // Check the previous line to determine context, very basic context check
        const prevLine = index > 0 ? text.split('\\n')[index-1] : "";
        if (prevLine.toLowerCase().startsWith("problem:")) {
            return (
              <span key={index} className="block text-destructive ml-4">
                {line}
              </span>
            );
        }
        if (prevLine.toLowerCase().startsWith("suggestion:")) {
             return (
              <span key={index} className="block text-accent ml-4">
                {line}
              </span>
            );
        }
      }
      return (
        <span key={index} className="block">
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
        <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert whitespace-pre-wrap">
          {renderContentWithHighlighting(content)}
        </div>
      </CardContent>
    </Card>
  );
}
