"use client";

import { Copy, Loader2, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { PublicSkill, SkillInputValues } from "@/lib/skills/types";
import { formatCurrency } from "@/lib/utils";

interface RunResponse {
  output: string;
  usage: { inputTokens: number; outputTokens: number; costUsd: number };
}

export function SkillRunner({ skill, backHref }: { skill: PublicSkill; backHref: string }) {
  const [values, setValues] = useState<SkillInputValues>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RunResponse | null>(null);

  const update = (name: string, v: string | number) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  async function onRun(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: skill.id, input: values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ada error, coba lagi.");
      setResult(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ada error");
    } finally {
      setLoading(false);
    }
  }

  function onCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.output);
    toast.success("Copied to clipboard");
  }

  function onReset() {
    setValues({});
    setResult(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
      <form onSubmit={onRun} className="space-y-5">
        <Link href={backHref} className="text-xs text-ink-muted hover:text-ink transition-colors">
          ← Back to {skill.department}
        </Link>
        <div>
          <h1 className="heading-serif text-4xl mb-2">{skill.name}</h1>
          <p className="text-ink-soft text-sm">{skill.tagline}</p>
        </div>

        <div className="space-y-4">
          {skill.inputs.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-accent ml-1">*</span>}
              </Label>
              {field.type === "textarea" && (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                />
              )}
              {field.type === "select" && (
                <Select
                  id={field.name}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                >
                  <option value="">Pilih...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              )}
              {(field.type === "text" || field.type === "number") && (
                <Input
                  id={field.name}
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.placeholder}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                />
              )}
              {field.helperText && (
                <p className="text-xs text-ink-muted">{field.helperText}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="accent" size="lg" disabled={loading} className="flex-1">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {loading ? "Ngerjain..." : "Run agent"}
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={onReset} disabled={loading}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <div className="min-h-[560px] surface-card p-6 flex flex-col">
        {!result && !loading && (
          <div className="flex-1 grid place-items-center text-center text-ink-muted text-sm">
            <div>
              <p className="mb-1">Hasil bakal muncul di sini.</p>
              <p className="text-xs">Isi form di kiri, klik "Run agent".</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex-1 grid place-items-center text-ink-muted">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <p className="text-sm">Claude lagi mikirin buat lo...</p>
            </div>
          </div>
        )}

        {result && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Output</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {result.usage.inputTokens + result.usage.outputTokens} tokens · {formatCurrency(result.usage.costUsd)}
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={onCopy}>
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>
            <div className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-ink overflow-auto animate-fade-in font-sans">
              {result.output}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
