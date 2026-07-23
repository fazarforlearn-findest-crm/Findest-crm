import Link from "next/link";
import { DepartmentCard } from "@/components/DepartmentCard";
import { PixelMascot } from "@/components/PixelMascot";
import { DEPARTMENTS } from "@/lib/departments";
import { SKILLS } from "@/lib/skills";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PixelMascot crew="workspace" size={24} color="#3A2A1F" />
          <span className="text-sm font-medium tracking-wide">findest-workforce</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-ink-soft">
          <Link href="/history" className="hover:text-ink transition-colors">History</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="heading-serif text-6xl md:text-7xl">
          Your Findest{" "}
          <span className="text-accent">Workforce.</span>
        </h1>
        <p className="mt-6 text-lg text-ink-soft">
          {SKILLS.length} real skills. {DEPARTMENTS.length} crews. One workspace.
        </p>

        <div className="mt-20 relative">
          <div className="mx-auto w-fit surface-card px-8 py-6 flex flex-col items-center gap-3">
            <PixelMascot crew="workspace" size={80} color="#3A2A1F" />
            <p className="text-[10px] uppercase tracking-widest text-ink-muted">The Workspace</p>
            <p className="heading-serif text-2xl">findest-workforce</p>
          </div>

          <svg className="mx-auto mt-6 opacity-60" width="360" height="80" viewBox="0 0 360 80" aria-hidden>
            <line x1="180" y1="0" x2="60" y2="80" stroke="#E86A2C" strokeWidth="1" />
            <line x1="180" y1="0" x2="180" y2="80" stroke="#3B82C4" strokeWidth="1" />
            <line x1="180" y1="0" x2="300" y2="80" stroke="#4B9E6A" strokeWidth="1" />
          </svg>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {DEPARTMENTS.map((d) => (
            <DepartmentCard key={d.id} dept={d} />
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-center text-xs text-ink-muted border-t border-ink/5">
        Built with Claude Sonnet 5 · {new Date().getFullYear()} Findest Sport
      </footer>
    </main>
  );
}
