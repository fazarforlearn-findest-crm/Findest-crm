import Link from "next/link";
import { PixelMascot } from "@/components/PixelMascot";
import { getDepartment } from "@/lib/departments";
import { getSkill } from "@/lib/skills";
import { getSupabaseServer, hasSupabase } from "@/lib/supabase";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface AgentRun {
  id: string;
  department: string;
  skill_id: string;
  input: Record<string, string | number>;
  output: string;
  input_tokens: number;
  output_tokens: number;
  cost_usd: number;
  created_at: string;
}

export default async function HistoryPage() {
  let runs: AgentRun[] = [];
  let error: string | null = null;

  if (!hasSupabase()) {
    error = "Supabase belum di-setup. Isi .env.local dulu.";
  } else {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { data, error: err } = await supabase
        .from("agent_runs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (err) error = err.message;
      else runs = (data as AgentRun[]) ?? [];
    }
  }

  return (
    <main className="min-h-screen">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PixelMascot crew="workspace" size={24} color="#3A2A1F" />
          <span className="text-sm font-medium tracking-wide">findest-workforce</span>
        </Link>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-8 pb-16">
        <h1 className="heading-serif text-5xl mb-2">Agent Runs</h1>
        <p className="text-ink-soft mb-8">Riwayat 50 run terakhir.</p>

        {error && (
          <div className="surface-card p-6 text-sm text-ink-soft">
            <p className="font-medium mb-1">History belum tersedia</p>
            <p>{error}</p>
          </div>
        )}

        {!error && runs.length === 0 && (
          <div className="surface-card p-10 text-center text-ink-muted">
            Belum ada run. Coba jalanin skill dulu.
          </div>
        )}

        {!error && runs.length > 0 && (
          <div className="space-y-3">
            {runs.map((r) => {
              const skill = getSkill(r.skill_id);
              const dept = getDepartment(r.department);
              return (
                <details key={r.id} className="surface-card p-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      {dept && <PixelMascot crew={dept.id} size={28} color={dept.accentHex} />}
                      <div>
                        <p className="font-medium">{skill?.name ?? r.skill_id}</p>
                        <p className="text-xs text-ink-muted mt-0.5">
                          {formatDate(r.created_at)} · {r.input_tokens + r.output_tokens} tokens · {formatCurrency(r.cost_usd)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-ink-muted">expand</span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-ink/5 space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Input</p>
                      <pre className="text-xs bg-canvas/50 dark:bg-black/20 p-3 rounded-lg overflow-x-auto">
{JSON.stringify(r.input, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Output</p>
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">{r.output}</div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
