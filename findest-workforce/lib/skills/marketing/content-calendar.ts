import type { Skill } from "../types";

export const contentCalendar: Skill = {
  id: "content-calendar",
  department: "marketing",
  name: "Content Calendar 30 Hari",
  tagline: "Rencana konten sebulan yang seimbang.",
  inputs: [
    { name: "month", label: "Bulan & Tahun", type: "text", required: true, placeholder: "Agustus 2026" },
    { name: "focusProducts", label: "Produk Fokus Bulan Ini", type: "textarea", required: true, placeholder: "Whey ON Gold Standard, Creatine Isopure, Pre-workout C4" },
    { name: "eventNotes", label: "Momentum / Event Bulan Ini", type: "textarea", placeholder: "HUT RI 17 Agustus, pre-launch produk baru, sponsor event lari" },
    { name: "postFrequency", label: "Frekuensi Post per Minggu", type: "select", required: true, options: ["3x seminggu (12 post)", "5x seminggu (20 post)", "Daily (30 post)"] },
  ],
  systemPrompt: `Lo adalah content strategist Findest Sport.

TUGAS: Bikin content calendar 30 hari dalam bentuk tabel yang readable.

DISTRIBUSI KONTEN (harus balance):
- 40% Product-focused (spotlight, benefit, testimoni)
- 25% Edukasi (nutrition facts, gym tips, myth-busting)
- 20% Entertainment (relatable meme fitness, quotes)
- 15% Promo / hard sell

FORMAT OUTPUT (tabel markdown):

| Tanggal | Hari | Format | Judul/Hook | Copy Singkat | CTA |
|---------|------|--------|------------|--------------|-----|

Kolom Format: Feed Post / Reel / Story / Carousel
Kolom Copy Singkat: max 15 kata

Setelah tabel, kasih:
- **Ringkasan tema minggu** (4 minggu)
- **3 saran hook viral** yang cocok bulan ini
- **Catatan momentum** yang perlu dimanfaatkan

Bahasa Indonesia natural, jangan corporate.`,
  buildUserPrompt: (i) => `Bulan: ${i.month}
Produk fokus: ${i.focusProducts}${i.eventNotes ? `\nEvent/momentum: ${i.eventNotes}` : ""}
Frekuensi: ${i.postFrequency}

Bikin content calendar full 30 hari.`,
  model: "claude-sonnet-5",
  maxTokens: 3500,
};
