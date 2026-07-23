import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-11 rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink placeholder:text-ink-muted",
        "focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-transparent",
        "dark:bg-[#24211D] dark:text-canvas",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
