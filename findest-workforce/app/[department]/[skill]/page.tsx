import Link from "next/link";
import { notFound } from "next/navigation";
import { PixelMascot } from "@/components/PixelMascot";
import { SkillRunner } from "@/components/SkillRunner";
import { getDepartment } from "@/lib/departments";
import { SKILLS, getSkill } from "@/lib/skills";
import { toPublicSkill } from "@/lib/skills/types";

export function generateStaticParams() {
  return SKILLS.map((s) => ({ department: s.department, skill: s.id }));
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ department: string; skill: string }>;
}) {
  const { department, skill: skillParam } = await params;
  const dept = getDepartment(department);
  const skill = getSkill(skillParam);
  if (!dept || !skill || skill.department !== dept.id) notFound();

  return (
    <main className="min-h-screen">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PixelMascot crew="workspace" size={24} color="#3A2A1F" />
          <span className="text-sm font-medium tracking-wide">findest-workforce</span>
        </Link>
        <Link href="/history" className="text-xs text-ink-soft hover:text-ink transition-colors">History</Link>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-8 pb-16">
        <SkillRunner skill={toPublicSkill(skill)} backHref={`/${dept.id}`} />
      </section>
    </main>
  );
}
