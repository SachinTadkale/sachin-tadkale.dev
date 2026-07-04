import { cn } from "@/lib/utils";
import "./SectionLabel.css";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("section-label", className)}>{children}</p>;
}
