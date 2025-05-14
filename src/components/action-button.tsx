
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  badgeCount?: number | string;
  onClick?: () => void;
  isActive?: boolean;
  isAlert?: boolean; // For "Improve" button styling (yellow)
  isError?: boolean; // For "Errors" button styling (red)
  textColorClassName?: string; // Default text color for non-active, non-alert, non-error states
  badgeBgClassName?: string; // Custom badge background
  badgeTextClassName?: string; // Custom badge text color
}

export function ActionButton({
  icon: Icon,
  label,
  badgeCount,
  onClick,
  isActive,
  isAlert,
  isError,
  textColorClassName = "text-muted-foreground", // Default icon/text color
  badgeBgClassName, // Allow custom badge bg
  badgeTextClassName, // Allow custom badge text
}: ActionButtonProps) {
  
  let iconColorClass = textColorClassName; // Start with default
  let labelColorClass = textColorClassName;

  if (isActive) {
    iconColorClass = "text-primary";
    labelColorClass = "text-primary";
  }
  if (isAlert) {
    iconColorClass = "text-[hsl(var(--chart-4))]"; // Yellow for icon
    labelColorClass = "text-[hsl(var(--chart-4))]"; // Yellow for label
     if (isActive) { // If active AND alert, prioritize alert color for icon, but keep label primary if that's the convention
        labelColorClass = "text-primary";
     }
  }
  if (isError) {
    iconColorClass = "text-destructive"; // Red for icon
    labelColorClass = "text-destructive"; // Red for label
     if (isActive) { // If active AND error, prioritize error color for icon
        labelColorClass = "text-primary";
     }
  }
  
  // Specific override for "Web Vitals" if it's active
  if (label === "Web Vitals" && isActive) {
    iconColorClass = "text-primary";
    labelColorClass = "text-primary";
  }


  let finalBadgeBgClassName = badgeBgClassName;
  let finalBadgeTextClassName = badgeTextClassName ?? "text-primary-foreground"; // Default badge text

  if (badgeCount !== undefined) {
    if (label === "Full Report") {
      finalBadgeBgClassName = finalBadgeBgClassName ?? (isActive ? "bg-primary" : "bg-muted-foreground");
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-white";
    } else if (isAlert) {
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-[hsl(var(--chart-4))]"; // Yellow badge
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-black"; // Ensure contrast
    } else if (isError) {
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-destructive"; // Red badge
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-destructive-foreground";
    } else { // Default badge (e.g., for hypothetical future badges)
      finalBadgeBgClassName = finalBadgeBgClassName ?? "bg-primary";
      finalBadgeTextClassName = finalBadgeTextClassName ?? "text-primary-foreground";
    }
  }


  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center h-auto px-1.5 sm:px-2 py-2 text-xs hover:bg-slate-100 focus:bg-slate-100",
        labelColorClass // Apply label color to the button itself for the text part
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6 mb-0.5", iconColorClass)} />
        {badgeCount !== undefined && (
          <span className={cn(
            "absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 text-[0.6rem] sm:text-xs font-semibold rounded-full min-w-[1.1rem] sm:min-w-[1.25rem] h-4 sm:h-5 flex items-center justify-center px-0.5 sm:px-1",
            finalBadgeBgClassName, 
            finalBadgeTextClassName
            )}>
            {badgeCount}
          </span>
        )}
      </div>
      <span className="mt-0.5">{label}</span>
    </Button>
  );
}

    