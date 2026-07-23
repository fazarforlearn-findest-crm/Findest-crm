import { cn } from "@/lib/utils";

const PATTERNS: Record<string, string[]> = {
  workspace: [
    "..XXXXXX..",
    ".X..XX..X.",
    "XX..XX..XX",
    "XXXXXXXXXX",
    "X.XX..XX.X",
    "X.XX..XX.X",
    "XX......XX",
    ".XXX..XXX.",
    "..XX..XX..",
    ".XX....XX.",
  ],
  marketing: [
    "...XXXX...",
    "..X....X..",
    ".XX....XX.",
    "XX..XX..XX",
    "XX..XX..XX",
    "XXXXXXXXXX",
    "X..XXXX..X",
    "X.X....X.X",
    "..XX..XX..",
    "..X....X..",
  ],
  sales: [
    "..XXXXXX..",
    ".XXXXXXXX.",
    "XX.XXXX.XX",
    "XXXXXXXXXX",
    "X..X..X..X",
    "XX......XX",
    ".XXXXXXXX.",
    ".X..XX..X.",
    "..X.XX.X..",
    "...XXXX...",
  ],
  finance: [
    "..XXXXXX..",
    ".X......X.",
    "X..X..X..X",
    "X..X..X..X",
    "X........X",
    "XX......XX",
    "X.X....X.X",
    "X..XXXX..X",
    ".XX....XX.",
    "..XXXXXX..",
  ],
};

type MascotKey = keyof typeof PATTERNS;

export function PixelMascot({
  crew,
  size = 48,
  color = "#3A2A1F",
  className,
}: {
  crew: MascotKey;
  size?: number;
  color?: string;
  className?: string;
}) {
  const pattern = PATTERNS[crew] ?? PATTERNS.workspace;
  const grid = pattern.length;
  const cell = size / grid;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {pattern.map((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill={color}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
