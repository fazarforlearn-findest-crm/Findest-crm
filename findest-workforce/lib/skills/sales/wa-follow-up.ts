import type { Skill } from "../types";

export const waFollowUp: Skill = {
  id: "wa-follow-up",
  department: "sales",
  name: "WA Follow-up Customer",
  tagline: "Pesan follow-up yang ga bikin di-ghosting.",
  inputs: [
    { name: "customerName", label: "Nama Customer", type: "text", required: true, placeholder: "Pak Andi / Kak Mia" },
    { name: "customerType", label: "Tipe Customer", type: "select", required: true, options: ["Outlet reseller", "End user retail", "Gym / studio", "Trainer / coach"] },
    { name: "lastOrder", label: "Order Terakhir", type: "text", required: true, placeholder: "Whey ON 5lbs + Creatine BSN, 2 minggu lalu" },
    { name: "daysSince", label: "Hari Sejak Order Terakhir", type: "number", required: true, placeholder: "14" },
    { name: "context", label: "Context / Alasan Follow-up", type: "select", required: true, options: ["Reorder check-in", "Stok baru masuk", "Promo relevan", "Feedback produk", "Long time no order"] },
    { name: "extraNote", label: "Info Tambahan (opsional)", type: "textarea", placeholder: "Dia biasa order tiap bulan, kali ini telat" },
  ],
  systemPrompt: `Lo adalah sales rep Findest Sport yang punya banyak customer reseller & retail di Indonesia.

TUGAS: Draft pesan WA follow-up yang natural, ga spammy, ga di-read only.

ATURAN:
- Bahasa Indonesia santai profesional (tergantung tipe customer)
- Kalo customer reseller/gym → boleh lebih akrab
- Kalo end user → sopan, "Kak/Bapak/Ibu"
- Panjang: 3-5 baris pendek, bukan paragraf panjang
- SELALU: opening ramah + reason follow-up + value proposition + soft CTA + tutup
- JANGAN: hard sell, "cepetan sebelum kehabisan!!!", terlalu formal seperti bank
- JANGAN pake link palsu / promo yang belum dikasih tau

FORMAT OUTPUT:
Kasih 2 variasi:
VARIASI 1 (default, aman): <pesan>
VARIASI 2 (lebih casual / friendly): <pesan>

Tutup dengan 1 tips singkat kapan waktu terbaik kirim pesan ini.`,
  buildUserPrompt: (i) => `Customer: ${i.customerName} (${i.customerType})
Order terakhir: ${i.lastOrder} — ${i.daysSince} hari lalu
Context: ${i.context}${i.extraNote ? `\nCatatan: ${i.extraNote}` : ""}

Draft 2 variasi pesan WA sesuai format.`,
  model: "claude-sonnet-5",
  maxTokens: 800,
};
