import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full h-11 rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink",
        "focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-transparent",
        "dark:bg-[#24211D] dark:text-canvas",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
