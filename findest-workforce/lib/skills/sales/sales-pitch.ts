import type { Skill } from "../types";

export const salesPitch: Skill = {
  id: "sales-pitch",
  department: "sales",
  name: "Sales Pitch Outlet Baru",
  tagline: "Pitch calon reseller yang meyakinkan.",
  inputs: [
    { name: "targetOutlet", label: "Target Outlet", type: "text", required: true, placeholder: "Nama gym / toko / trainer" },
    { name: "outletType", label: "Tipe Outlet", type: "select", required: true, options: ["Gym / fitness center", "Toko supplement fisik", "Online reseller", "Personal trainer", "Nutrisionist / klinik"] },
    { name: "outletScale", label: "Skala Outlet", type: "select", required: true, options: ["Kecil (<50 member/customer)", "Menengah (50-200)", "Besar (200+)", "Chain / multi-outlet"] },
    { name: "targetProducts", label: "Produk yang Ditawarkan", type: "textarea", required: true, placeholder: "3-5 produk best-seller Findest yang cocok" },
    { name: "usp", label: "USP Findest yang Relevan", type: "textarea", placeholder: "Konsinyasi, harga distributor, garansi asli, pengiriman cepat area X" },
    { name: "channel", label: "Channel Pitch", type: "select", required: true, options: ["Pesan WA cold", "Email formal", "In-person meeting script"] },
  ],
  systemPrompt: `Lo adalah head of sales Findest Sport.

TUGAS: Bikin pitch buat calon reseller/outlet baru yang belum kenal Findest.

PRINSIP:
- Value-first, bukan sales-first (mulai dari "apa yang mereka gain", bukan "kami perusahaan X sejak Y")
- Spesifik ke tipe & skala outlet mereka
- Ada social proof implicit (brand yang dibawa: ON, BSN, Isopure — udah trusted)
- Ada low-commitment ask (bukan langsung minta beli, minta ngobrol / kirim katalog)

STRUKTUR OUTPUT (sesuai channel):

Kalo WA cold: 4-6 baris, hook kuat di kalimat 1, CTA lembut di akhir.
Kalo email: subject line + body 200-300 kata, formal tapi human.
Kalo meeting script: bullet points opening (30 detik), problem framing, solution, next step.

Tambahan wajib:
**OBJECTION HANDLING** (top 3 kemungkinan objection + jawaban singkat)
- "Saya udah pake distributor lain" → ...
- "Harganya harus lebih murah dulu" → ...
- "Belum yakin marketnya" → ...

Bahasa Indonesia profesional, adjust formality ke channel.`,
  buildUserPrompt: (i) => `Target: ${i.targetOutlet} (${i.outletType}, skala ${i.outletScale})
Produk yang ditawarkan: ${i.targetProducts}
USP: ${i.usp || "harga distributor + brand trusted"}
Channel: ${i.channel}

Bikin pitch + objection handling.`,
  model: "claude-sonnet-5",
  maxTokens: 1500,
};
