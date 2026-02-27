import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "accent" | "success" | "warning";
}

const variantStyles = {
  default: {
    icon: "bg-gradient-to-br from-primary/15 to-primary/5 text-primary",
    border: "border-border",
  },
  accent: {
    icon: "bg-gradient-to-br from-primary/15 to-primary/5 text-primary",
    border: "border-border",
  },
  success: {
    icon: "bg-gradient-to-br from-success/15 to-success/5 text-success",
    border: "border-border",
  },
  warning: {
    icon: "bg-gradient-to-br from-warning/15 to-warning/5 text-warning",
    border: "border-border",
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden animate-fade-in",
        "transition-all duration-200 ease-out",
        "hover:shadow-md hover:-translate-y-0.5",
        "border",
        variantStyles[variant].border
      )}
    >
      {/* Gradiente sutil de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">
              {value}
            </p>
            {trend && (
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md",
                  trend.positive 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                )}>
                  <span className="text-sm">{trend.positive ? "↑" : "↓"}</span>
                  <span>{Math.abs(trend.value)}%</span>
                </div>
                <span className="text-xs text-muted-foreground">vs mes anterior</span>
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground pt-1">{subtitle}</p>
            )}
          </div>
          
          {/* Icono con gradiente */}
          <div className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            "transition-transform duration-200 group-hover:scale-110",
            variantStyles[variant].icon
          )}>
            <Icon className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
