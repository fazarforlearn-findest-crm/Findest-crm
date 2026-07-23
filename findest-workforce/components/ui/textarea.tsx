import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted",
        "focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-transparent",
        "resize-y min-h-[96px]",
        "dark:bg-[#24211D] dark:text-canvas",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
