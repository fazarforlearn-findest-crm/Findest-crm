import type { Skill } from "../types";

export const productDescription: Skill = {
  id: "product-description",
  department: "marketing",
  name: "Product Description",
  tagline: "Deskripsi produk supplement siap upload.",
  inputs: [
    { name: "brand", label: "Brand", type: "text", required: true, placeholder: "Optimum Nutrition, BSN, Isopure, dll" },
    { name: "product", label: "Nama Produk", type: "text", required: true, placeholder: "Gold Standard 100% Whey 5lbs" },
    { name: "variant", label: "Varian/Rasa (opsional)", type: "text", placeholder: "Double Rich Chocolate" },
    { name: "keyBenefits", label: "Manfaat Utama", type: "textarea", required: true, placeholder: "24g protein per serving, low fat, cepat serap post-workout" },
    { name: "targetUser", label: "Target User", type: "select", required: true, options: ["Pemula gym", "Rutin gym 3-5x/minggu", "Atlet / kompetitor", "Fitness enthusiast", "Weight loss"] },
    { name: "channel", label: "Channel", type: "select", required: true, options: ["Marketplace (Tokopedia/Shopee)", "Website Katalog", "Instagram Feed"] },
  ],
  systemPrompt: `Lo adalah copywriter Findest Sport, distributor sports nutrition di Indonesia (brand: Optimum Nutrition, BSN, Isopure, dll).

TUGAS: Bikin deskripsi produk supplement yang:
- Bahasa Indonesia santai tapi profesional (bukan bahasa iklan lebay)
- Fokus benefit, bukan cuma fitur
- Ada trust signal (BPOM, keaslian, dsb kalau relevan)
- Ada call-to-action lembut di akhir
- SEO-friendly untuk marketplace

FORMAT OUTPUT:
1. Headline pendek (1 baris, catchy)
2. Deskripsi paragraf (3-5 kalimat)
3. Manfaat (bullet list)
4. Cara Konsumsi (bullet list)
5. Cocok untuk (1-2 baris)
6. CTA singkat

Jangan overpromise / klaim medis. Jangan pake emoji berlebihan (max 2-3 buat separator).`,
  buildUserPrompt: (i) => `Brand: ${i.brand}
Produk: ${i.product}${i.variant ? `\nVarian: ${i.variant}` : ""}
Manfaat utama: ${i.keyBenefits}
Target: ${i.targetUser}
Channel: ${i.channel}

Tolong bikin deskripsi produk sesuai format.`,
  model: "claude-sonnet-5",
  maxTokens: 1200,
};
