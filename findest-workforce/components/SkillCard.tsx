import Link from "next/link";
import { PixelMascot } from "./PixelMascot";
import type { Department } from "@/lib/departments";
import type { Skill } from "@/lib/skills/types";

export function SkillCard({ skill, dept }: { skill: Skill; dept: Department }) {
  return (
    <Link
      href={`/${dept.id}/${skill.id}`}
      className="surface-card p-6 flex flex-col items-center text-center gap-3 group"
    >
      <PixelMascot crew={dept.id} size={44} color={dept.accentHex} />
      <h3 className="heading-serif text-xl group-hover:text-accent transition-colors">
        {skill.name}
      </h3>
      <p className="text-sm text-ink-soft leading-snug">{skill.tagline}</p>
    </Link>
  );
}
