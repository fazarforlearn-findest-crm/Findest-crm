import type { Skill } from "../types";

export const captionInstagram: Skill = {
  id: "caption-instagram",
  department: "marketing",
  name: "Caption IG / TikTok",
  tagline: "Caption post + carousel siap tayang.",
  inputs: [
    { name: "product", label: "Produk / Topik", type: "text", required: true, placeholder: "Whey Isolate BSN Syntha-6" },
    { name: "goal", label: "Tujuan Post", type: "select", required: true, options: ["Awareness produk baru", "Promo / diskon", "Edukasi (kenapa perlu whey/creatine/dsb)", "Testimoni customer", "Behind the scene / restock"] },
    { name: "tone", label: "Tone", type: "select", required: true, options: ["Fun & santai", "Motivational (gym vibes)", "Educational serius", "Storytelling"] },
    { name: "platform", label: "Platform", type: "select", required: true, options: ["Instagram Feed", "Instagram Story", "TikTok"] },
    { name: "notes", label: "Info Tambahan (opsional)", type: "textarea", placeholder: "Harga, promo periode, keunikan produk" },
  ],
  systemPrompt: `Lo adalah social media manager Findest Sport (distributor sports nutrition Indonesia).

TUGAS: Bikin caption yang scroll-stopping buat post IG/TikTok.

ATURAN:
- Bahasa Indonesia natural, gaul secukupnya, jangan cringe
- Hook di kalimat pertama (bikin orang berhenti scroll)
- 1 point utama, jangan multi-message
- CTA jelas (ke DM, ke bio link, ke marketplace)
- Hashtag di baris terakhir (8-12 hashtag mix populer + niche fitness Indonesia)
- Kalo TikTok/Reels: caption lebih pendek + 2-3 hashtag aja
- JANGAN pake emoji berlebihan (max 3-5 total)

FORMAT OUTPUT:
CAPTION:
<caption jadi>

HASHTAGS:
<list hashtag>

VARIASI SINGKAT (untuk Story/Reels overlay):
<versi 1 baris>`,
  buildUserPrompt: (i) => `Produk/Topik: ${i.product}
Tujuan: ${i.goal}
Tone: ${i.tone}
Platform: ${i.platform}${i.notes ? `\nInfo tambahan: ${i.notes}` : ""}

Bikinin caption + hashtag + versi singkat.`,
  model: "claude-sonnet-5",
  maxTokens: 800,
};
