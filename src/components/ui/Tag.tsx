import { cn } from "@/lib/utils";
import "./Tag.css";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("tag", className)}>{children}</span>;
}
