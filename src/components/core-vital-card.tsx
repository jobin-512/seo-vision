
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CoreVitalCardProps {
  metricName: string;
  status: "Good" | "Improve" | "Poor";
  value?: string;
}

export function CoreVitalCard({ metricName, status, value }: CoreVitalCardProps) {
  const statusColor = 
    status === "Good" ? "text-accent" :
    status === "Improve" ? "text-[hsl(var(--chart-4))]" :
    status === "Poor" ? "text-destructive" :
    "text-foreground";

  return (
    <Card className="shadow-md rounded-lg">
      <CardContent className="p-4 text-center">
        <p className="text-sm text-muted-foreground">{metricName}</p>
        <p className={cn("text-xl font-semibold mt-1", statusColor)}>{status}</p>
        {value && <p className="text-xs text-muted-foreground mt-0.5">{value}</p>}
      </CardContent>
    </Card>
  );
}
