
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
  const getScoreQuality = (currentScore: number): { description: string; colorClass: string } => {
    if (currentScore === 100) return { description: "Perfect", colorClass: "text-accent" };
    if (currentScore >= 90) return { description: "Excellent", colorClass: "text-accent" };
    if (currentScore >= 75) return { description: "Good", colorClass: "text-accent" };
    if (currentScore >= 60) return { description: "Average", colorClass: "text-[hsl(var(--chart-4))]" };
    if (currentScore >= 40) return { description: "Below Average", colorClass: "text-[hsl(var(--chart-1))]" };
    if (currentScore >= 20) return { description: "Poor", colorClass: "text-destructive" };
    return { description: "Very Poor", colorClass: "text-destructive" };
  };

  const { description, colorClass } = getScoreQuality(score);

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
        <p className={`text-sm font-medium mt-1 ${colorClass}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
