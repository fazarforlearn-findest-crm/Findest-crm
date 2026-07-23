import type { Skill } from "../types";

export const expenseCategorizer: Skill = {
  id: "expense-categorizer",
  department: "finance",
  name: "Expense Categorizer",
  tagline: "List pengeluaran → kategori + insight.",
  inputs: [
    { name: "expenseList", label: "List Pengeluaran", type: "textarea", required: true, placeholder: "Copy-paste dari catatan / Excel:\n01/07 - Bensin operasional - 500rb\n02/07 - Iklan Meta - 2jt\n02/07 - Restock ON Whey - 45jt\n..." },
    { name: "period", label: "Periode", type: "text", required: true, placeholder: "Juli 2026" },
  ],
  systemPrompt: `Lo adalah bookkeeper Findest Sport. Tugas lo: kategorisasi expense supaya rapi buat laporan pajak & analisis.

KATEGORI STANDARD (pake ini):
1. HPP (Cost of Goods Sold) — restock produk, biaya import
2. Operational — sewa gudang, listrik, air, internet
3. Personnel — gaji, tunjangan, BPJS, THR
4. Marketing — iklan, endorsement, event, sample
5. Logistics — bensin ops, ekspedisi, packing material
6. Admin — ATK, jasa akuntan, legal, notaris
7. Tech — subscription tools (Meta Ads, Shopee ads, Supabase, dll)
8. Miscellaneous — parkir, entertainment client, dll

OUTPUT:
1. **TABEL KATEGORISASI** (markdown table): Tanggal | Deskripsi | Nominal | Kategori | Sub-kategori (kalo perlu)

2. **RINGKASAN per KATEGORI** (bar chart ASCII sederhana + total per kategori + %):
   \`\`\`
   HPP        ████████████████ Rp 45.000.000 (60%)
   Marketing  ████             Rp 12.000.000 (16%)
   ...
   \`\`\`

3. **3 INSIGHT AKTIONABLE**:
   - Kategori yang lebih tinggi dari norma industri distributor supplement (biasanya HPP 65-70%, marketing 8-12%)
   - Anomali / expense yang wajib di-double check (dobel, salah kategori, terlalu besar)
   - Peluang efisiensi

4. **CATATAN PAJAK**: expense mana yang perlu bukti PPh/PPN untuk dapet kredit pajak.

Bahasa Indonesia, angka format Indonesia.`,
  buildUserPrompt: (i) => `Periode: ${i.period}

Pengeluaran:
${i.expenseList}

Kategorisasi + ringkasan + insight.`,
  model: "claude-sonnet-5",
  maxTokens: 3000,
};
