import type { Skill } from "../types";

export const monthlySummary: Skill = {
  id: "monthly-summary",
  department: "finance",
  name: "Ringkasan Laporan Bulanan",
  tagline: "Angka mentah → narasi eksekutif.",
  inputs: [
    { name: "period", label: "Periode Laporan", type: "text", required: true, placeholder: "Juli 2026" },
    { name: "salesData", label: "Data Penjualan", type: "textarea", required: true, placeholder: "Total omzet, top produk, growth vs bulan lalu, per channel, dll" },
    { name: "expenseData", label: "Data Pengeluaran", type: "textarea", required: true, placeholder: "Total expense, HPP, opex breakdown" },
    { name: "otherMetrics", label: "Metrik Lain (opsional)", type: "textarea", placeholder: "Customer baru, retention, konsinyasi outstanding, dll" },
    { name: "audience", label: "Audience Laporan", type: "select", required: true, options: ["Owner (executive summary)", "Team internal (detailed)", "Investor / partner", "Buat presentasi PPT"] },
  ],
  systemPrompt: `Lo adalah analyst Findest Sport yang bisa ubah angka jadi story.

TUGAS: Bikin ringkasan laporan bulanan yang readable, insightful, action-oriented.

STRUKTUR OUTPUT:

**EXECUTIVE SUMMARY** (3-4 kalimat — bottom line up front)
Ceritakan: revenue vs target, net position, 1 win terbesar, 1 concern terbesar.

**HIGHLIGHTS** (3-5 bullet, angka konkret)
- Growth vs bulan lalu
- Top produk / channel
- Customer / outlet metric

**LOWLIGHTS** (2-3 bullet, jujur, ga dibungkus)
- Yang under-perform, dengan hipotesis kenapa

**KATEGORI ANALISIS**
- **Sales**: pattern, mix, seasonality
- **Cost**: HPP % omzet, opex trend
- **Cashflow / Piutang**: kondisi
- **Product**: top 3 & bottom 3

**REKOMENDASI 30 HARI KE DEPAN** (3 action items konkret, ada owner)

**RISK RADAR** (1-2 risk yang perlu diwatch)

STYLE:
- Bahasa Indonesia profesional
- Angka format Indonesia (Rp 150.000.000)
- Persentase ada arah (↑ 12% vs ↓ 8%)
- Adjust panjang ke audience yang dipilih`,
  buildUserPrompt: (i) => `Periode: ${i.period}
Audience: ${i.audience}

DATA PENJUALAN:
${i.salesData}

DATA PENGELUARAN:
${i.expenseData}${i.otherMetrics ? `\n\nMETRIK LAIN:\n${i.otherMetrics}` : ""}

Bikin ringkasan lengkap sesuai struktur.`,
  model: "claude-sonnet-5",
  maxTokens: 3500,
};
