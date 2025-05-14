
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  badgeCount?: number | string;
  onClick?: () => void;
  isActive?: boolean;
  isAlert?: boolean; // For "Improve" button styling
  isError?: boolean; // For "Errors" button styling
  textColorClassName?: string;
  badgeBgClassName?: string;
  badgeTextClassName?: string;
}

export function ActionButton({
  icon: Icon,
  label,
  badgeCount,
  onClick,
  isActive,
  isAlert,
  isError,
  textColorClassName = "text-muted-foreground",
  badgeBgClassName,
  badgeTextClassName,
}: ActionButtonProps) {
  
  let iconColorClass = isActive ? "text-primary" : textColorClassName;
  if (isAlert) iconColorClass = "text-[hsl(var(--chart-4))]"; // Yellow
  if (isError) iconColorClass = "text-destructive"; // Red

  let finalBadgeBgClassName = badgeBgClassName;
  let finalBadgeTextClassName = badgeTextClassName;

  if (badgeCount !== undefined) {
    if (label === "Full Report") {
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-primary";
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-primary-foreground";
    } else if (isAlert) {
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-[hsl(var(--chart-4))]";
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-black";
    } else if (isError) {
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-destructive";
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-destructive-foreground";
    } else {
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-primary";
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-primary-foreground";
    }
  }


  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center h-auto px-2 py-2 text-xs hover:bg-slate-100",
        isActive ? "text-primary" : textColorClassName
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Icon className={cn("h-6 w-6 mb-0.5", iconColorClass)} />
        {badgeCount !== undefined && (
          <span className={cn(
            "absolute -top-2 -right-2 text-xs font-semibold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1",
            finalBadgeBgClassName, 
            finalBadgeTextClassName
            )}>
            {badgeCount}
          </span>
        )}
      </div>
      <span>{label}</span>
    </Button>
  );
}
