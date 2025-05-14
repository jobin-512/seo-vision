import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ReportContentCardProps {
  title: string;
  content: string;
  Icon?: LucideIcon;
}

export function ReportContentCard({ title, content, Icon }: ReportContentCardProps) {
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
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
