import Link from "next/link";
import { notFound } from "next/navigation";
import { PixelMascot } from "@/components/PixelMascot";
import { SkillCard } from "@/components/SkillCard";
import { DEPARTMENTS, getDepartment } from "@/lib/departments";
import { skillsByDepartment } from "@/lib/skills";

export function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ department: d.id }));
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>;
}) {
  const { department } = await params;
  const dept = getDepartment(department);
  if (!dept) notFound();
  const skills = skillsByDepartment(dept.id);

  return (
    <main className="min-h-screen">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PixelMascot crew="workspace" size={24} color="#3A2A1F" />
          <span className="text-sm font-medium tracking-wide">findest-workforce</span>
        </Link>
        <Link href="/history" className="text-xs text-ink-soft hover:text-ink transition-colors">History</Link>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <div className="flex items-center gap-4 mb-10">
          <PixelMascot crew={dept.id} size={72} color={dept.accentHex} />
          <div>
            <p className={`text-[11px] uppercase tracking-widest ${dept.accentClass}`}>
              Department 0{dept.index} / 03
            </p>
            <h1 className="heading-serif text-5xl mt-1">{dept.name}</h1>
            <p className="text-ink-soft mt-2">{dept.tagline}</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((s) => (
            <SkillCard key={s.id} skill={s} dept={dept} />
          ))}
        </div>
      </section>
    </main>
  );
}
