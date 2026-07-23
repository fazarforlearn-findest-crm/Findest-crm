import type Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { estimateCostUsd, getAnthropic } from "@/lib/anthropic";
import { getSkill } from "@/lib/skills";
import { getSupabaseAdmin, getSupabaseServer } from "@/lib/supabase";
import type { SkillInputValues } from "@/lib/skills/types";

export const runtime = "nodejs";

interface RunRequest {
  skillId: string;
  input: SkillInputValues;
}

export async function POST(req: Request) {
  let body: RunRequest;
  try {
    body = (await req.json()) as RunRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const skill = getSkill(body.skillId);
  if (!skill) {
    return NextResponse.json({ error: `Unknown skill: ${body.skillId}` }, { status: 404 });
  }

  const missing = skill.inputs
    .filter((f) => f.required && !String(body.input[f.name] ?? "").trim())
    .map((f) => f.label);
  if (missing.length) {
    return NextResponse.json(
      { error: `Isi dulu: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const client = getAnthropic();

  const message = await client.messages.create({
    model: skill.model,
    max_tokens: skill.maxTokens,
    system: skill.systemPrompt,
    messages: [{ role: "user", content: skill.buildUserPrompt(body.input) }],
  });

  const output = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const inputTokens = message.usage.input_tokens;
  const outputTokens = message.usage.output_tokens;
  const costUsd = estimateCostUsd(skill.model, inputTokens, outputTokens);

  const supabase = await getSupabaseServer();
  const admin = getSupabaseAdmin();
  if (supabase && admin) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await admin.from("agent_runs").insert({
        user_id: user.id,
        department: skill.department,
        skill_id: skill.id,
        input: body.input,
        output,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost_usd: costUsd,
      });
    }
  }

  return NextResponse.json({
    output,
    usage: { inputTokens, outputTokens, costUsd },
  });
}
