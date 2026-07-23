# Findest Workforce

AI agent workforce buat Findest Sport — 12 skill, 3 crew, 1 workspace.

Terinspirasi dari carousel "Claude Workforce" — versi ini di-tune khusus buat kebutuhan distributor sports nutrition di Indonesia.

## Departments (MVP)

- **Marketing & Content** — product-description, caption-instagram, promo-weekly, content-calendar
- **Sales & Customer Service** — wa-follow-up, wa-outlet-onboard, complaint-reply, sales-pitch
- **Finance & Reporting** — piutang-analysis, expense-categorizer, monthly-summary, cashflow-forecast

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn-style primitives
- Anthropic Claude Sonnet 5 (`@anthropic-ai/sdk`)
- Supabase (auth + `agent_runs` table untuk history)
- Framer Motion + lucide-react
- Deploy: Vercel

## Local Setup

```bash
# 1. Install deps
pnpm install

# 2. Copy env template dan isi
cp .env.example .env.local
# ANTHROPIC_API_KEY=sk-ant-...
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_ROLE_KEY=...

# 3. Jalanin dev server
pnpm dev
# buka http://localhost:3000
```

## Supabase Setup

1. Bikin project baru di [supabase.com](https://supabase.com) (free tier cukup) — atau share sama project Findest-crm yang existing.
2. Buka SQL Editor, paste isi `supabase/migrations/0001_agent_runs.sql`, run.
3. Enable email/OAuth auth di Authentication → Providers.
4. Copy Project URL + anon key + service role key ke `.env.local`.

**Kalo lo skip Supabase**: app tetep jalan, cuma history page bakal kosong (semua run tetep bisa dieksekusi, tapi ga disimpan).

## Deploy ke Vercel

```bash
# Install Vercel CLI (once)
npm i -g vercel

# Deploy
vercel

# Set env vars di dashboard Vercel:
# Settings → Environment Variables → paste 4 vars dari .env.local
```

Atau connect GitHub repo lo ke Vercel dashboard, auto-deploy tiap push.

## Nambah Skill Baru

1. Bikin file baru di `lib/skills/<department>/<skill-id>.ts`
2. Export object yang match interface `Skill` di `lib/skills/types.ts`
3. Import & tambahin ke array `SKILLS` di `lib/skills/index.ts`

Selesai — homepage, department page, dan skill page otomatis nambah entry-nya.

## Nambah Department Baru

1. Tambahin entry di `DEPARTMENTS` di `lib/departments.ts`
2. Tambahin key di `PATTERNS` di `components/PixelMascot.tsx` (10x10 pixel art)
3. Bikin folder `lib/skills/<new-dept>/` + skill di dalamnya
4. Tambahin ke `SKILLS` array

## Struktur File

```
findest-workforce/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── [department]/page.tsx       # Department showcase
│   ├── [department]/[skill]/page.tsx  # Skill runner
│   ├── history/page.tsx            # Riwayat run
│   ├── api/run-agent/route.ts      # Server API
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── SkillRunner.tsx             # Form + result
│   ├── DepartmentCard.tsx
│   ├── SkillCard.tsx
│   ├── PixelMascot.tsx
│   └── ui/                         # Button, Input, Textarea, Select, Label
├── lib/
│   ├── anthropic.ts                # SDK + pricing
│   ├── supabase.ts                 # Server/admin clients
│   ├── departments.ts
│   ├── utils.ts
│   └── skills/
│       ├── types.ts                # Skill contract
│       ├── index.ts                # Registry
│       ├── marketing/*.ts          # 4 skills
│       ├── sales/*.ts              # 4 skills
│       └── finance/*.ts            # 4 skills
├── supabase/migrations/            # SQL schema
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Cost Notes

Sonnet 5 rate (per 1M tokens): **input $3, output $15**.

Rata-rata 1 run ≈ 300 input + 1500 output tokens ≈ **$0.024** ≈ Rp 400.
Kalo tim lo jalanin ~500 skill/bulan → ~$12/bulan ≈ Rp 200rb.

Kalo mau lebih murah lagi, ganti model beberapa skill (yang simple) ke Haiku 4.5 di file skill masing-masing:
```ts
model: "claude-haiku-4-5-20251001",
```

## Next Steps

- [ ] Tambahin auth login page (Supabase auth pake Google/email)
- [ ] Streaming response biar hasil muncul real-time
- [ ] Skill baru: departments Operations, HR, Warehouse
- [ ] Tool use — skill yang query Supabase Findest-crm langsung
- [ ] WhatsApp Business API integration
- [ ] Multi-tenant (jadi produk SaaS buat distributor lain)
