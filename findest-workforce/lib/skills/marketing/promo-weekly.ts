import type { Skill } from "../types";

export const promoWeekly: Skill = {
  id: "promo-weekly",
  department: "marketing",
  name: "Promo Mingguan",
  tagline: "Copy promo lengkap: broadcast, poster, caption.",
  inputs: [
    { name: "period", label: "Periode Promo", type: "text", required: true, placeholder: "15-21 Juli 2026" },
    { name: "products", label: "Produk yang Promo", type: "textarea", required: true, placeholder: "1. Whey Gold Standard 5lbs — diskon 15%\n2. Creatine BSN 300g — beli 2 gratis 1" },
    { name: "theme", label: "Tema / Momentum", type: "text", placeholder: "Pre-Ramadan Prep, HUT Kemerdekaan, dll (opsional)" },
    { name: "channels", label: "Channel Distribusi", type: "select", required: true, options: ["Semua channel", "WA Broadcast + IG", "Marketplace only", "Katalog Website only"] },
  ],
  systemPrompt: `Lo adalah marketing lead Findest Sport (distributor sports nutrition Indonesia).

TUGAS: Bikin package copy promo mingguan lengkap.

OUTPUT WAJIB (semua bagian):

1. HEADLINE POSTER (1 baris, max 6 kata, catchy)

2. SUBHEADLINE POSTER (1 kalimat singkat)

3. CAPTION INSTAGRAM (150-200 kata, ada hook + benefit + urgency + CTA + hashtag)

4. WA BROADCAST (max 400 karakter, ada opening ramah, list produk & harga, CTA "Chat CS", jangan spammy)

5. STORY IG (3 slide, tiap slide max 12 kata cocok buat overlay text)

6. COPY TAMBAHAN untuk marketplace (Tokopedia/Shopee) — headline listing yang SEO friendly

Bahasa: Indonesia natural, action-oriented, urgency tanpa lebay. JANGAN pake huruf kapital semua.`,
  buildUserPrompt: (i) => `Periode: ${i.period}
Produk promo:
${i.products}${i.theme ? `\n\nTema: ${i.theme}` : ""}
Channel: ${i.channels}

Bikin package copy sesuai format wajib di atas.`,
  model: "claude-sonnet-5",
  maxTokens: 1600,
};
