import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  Icon?: LucideIcon;
  iconColor?: string;
  scoreSuffix?: string;
}

export function ScoreCard({ title, score, Icon, iconColor = "text-primary", scoreSuffix = "/100" }: ScoreCardProps) {
  return (
    <Card className="shadow-lg score-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold score-value" style={{ color: 'hsl(var(--accent))' }}>
          {score}
          <span className="text-xl text-muted-foreground">{scoreSuffix}</span>
        </div>
      </CardContent>
    </Card>
  );
}
