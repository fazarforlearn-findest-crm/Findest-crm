import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("block text-xs font-medium tracking-wide uppercase text-ink-soft", className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";
