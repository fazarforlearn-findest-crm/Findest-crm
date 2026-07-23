import type { Skill } from "../types";

export const cashflowForecast: Skill = {
  id: "cashflow-forecast",
  department: "finance",
  name: "Cashflow Forecast 30 Hari",
  tagline: "Prediksi cash in/out + scenario planning.",
  inputs: [
    { name: "currentCash", label: "Kas & Bank Saat Ini", type: "text", required: true, placeholder: "Rp 45.000.000" },
    { name: "expectedInflows", label: "Cash In 30 Hari ke Depan", type: "textarea", required: true, placeholder: "Piutang yang jatuh tempo, PO yang confirmed, penjualan retail average" },
    { name: "expectedOutflows", label: "Cash Out 30 Hari ke Depan", type: "textarea", required: true, placeholder: "Restock, gaji, sewa, cicilan, marketing, dll dengan tanggal jatuh tempo" },
    { name: "concerns", label: "Concern / Ketidakpastian", type: "textarea", placeholder: "Ada outlet yang bakal telat bayar, restock dolar naik, dll" },
  ],
  systemPrompt: `Lo adalah CFO Findest Sport. Cashflow forecasting = seni + sains, ga bisa cuma tebak.

TUGAS: Bikin forecast cashflow 30 hari ke depan dengan 3 skenario.

OUTPUT:

**RINGKASAN**
- Kas awal: Rp X
- Estimated cash in: Rp Y
- Estimated cash out: Rp Z
- Kas akhir (base case): Rp W
- Runway kalo ga ada revenue: X hari

**WEEKLY BREAKDOWN**
Tabel per minggu (4 minggu):
| Minggu | Cash In | Cash Out | Net | Ending Balance |

**3 SKENARIO**

1. **OPTIMISTIC** (semua piutang tertagih tepat waktu, sales +15%)
   - Ending cash: Rp X, buffer: sehat

2. **BASE CASE** (asumsi netral)
   - Ending cash: Rp X

3. **PESSIMISTIC** (2 outlet delay bayar 30 hari, sales -20%)
   - Ending cash: Rp X, risk: ...

**RED FLAG WEEKS** (minggu di mana cash bisa negatif atau di bawah buffer aman)

**REKOMENDASI**
- Yang perlu dieksekusi minggu ini (nagih piutang tertentu, tunda restock, negosiasi supplier)
- Buffer minimum yang harus dijaga
- Kalo skenario pessimistic terjadi, plan B: (opsi financing, extend supplier term, dll)

Bahasa Indonesia, angka format Indonesia. Jujur & realistis, jangan sugar-coat.`,
  buildUserPrompt: (i) => `Kas saat ini: ${i.currentCash}

CASH IN 30 HARI:
${i.expectedInflows}

CASH OUT 30 HARI:
${i.expectedOutflows}${i.concerns ? `\n\nCONCERN:\n${i.concerns}` : ""}

Bikin forecast lengkap sesuai struktur.`,
  model: "claude-sonnet-5",
  maxTokens: 3000,
};
