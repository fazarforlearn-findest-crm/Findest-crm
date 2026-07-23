import Link from "next/link";
import { PixelMascot } from "./PixelMascot";
import type { Department } from "@/lib/departments";
import { skillsByDepartment } from "@/lib/skills";

export function DepartmentCard({ dept }: { dept: Department }) {
  const count = skillsByDepartment(dept.id).length;
  return (
    <Link
      href={`/${dept.id}`}
      className="surface-card p-6 flex flex-col items-center text-center gap-3 group"
    >
      <PixelMascot crew={dept.id} size={56} color={dept.accentHex} />
      <div>
        <p className={`text-[10px] uppercase tracking-widest ${dept.accentClass}`}>
          Crew 0{dept.index} / 03
        </p>
        <h3 className="heading-serif text-2xl mt-1 group-hover:text-accent transition-colors">
          {dept.name}
        </h3>
      </div>
      <p className="text-sm text-ink-soft leading-snug">{dept.tagline}</p>
      <p className="text-xs text-ink-muted mt-2">{count} skills →</p>
    </Link>
  );
}
