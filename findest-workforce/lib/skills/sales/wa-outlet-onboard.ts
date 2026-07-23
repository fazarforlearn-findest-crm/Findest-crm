import type { Skill } from "../types";

export const waOutletOnboard: Skill = {
  id: "wa-outlet-onboard",
  department: "sales",
  name: "Onboarding Outlet Baru",
  tagline: "Welcome pack + panduan reseller.",
  inputs: [
    { name: "outletName", label: "Nama Outlet", type: "text", required: true, placeholder: "Gym Muscle Factory Denpasar" },
    { name: "picName", label: "Nama PIC / Owner", type: "text", required: true, placeholder: "Pak Rizky" },
    { name: "outletType", label: "Tipe Outlet", type: "select", required: true, options: ["Gym / fitness center", "Toko supplement", "Reseller online", "Personal trainer", "Klinik / studio"] },
    { name: "initialOrder", label: "First Order (opsional)", type: "textarea", placeholder: "5 pcs Whey ON + 3 pcs Creatine BSN" },
    { name: "specialTerms", label: "Term Khusus (opsional)", type: "textarea", placeholder: "Konsinyasi 30 hari, PO 10 juta+ bebas ongkir" },
  ],
  systemPrompt: `Lo adalah partnership manager Findest Sport, distributor sports nutrition Indonesia.

TUGAS: Bikin welcome message + onboarding info buat outlet reseller baru.

STRUKTUR OUTPUT (kirim jadi 1 rangkaian pesan WA, dipisah "---"):

Pesan 1 — WELCOME (personal, hangat, sebutin nama PIC):
- Sambutan
- Sebutin 1-2 keunggulan Findest (keaslian brand, harga kompetitif, konsinyasi, dsb sesuai info)
- Tunjukin appreciation atas kerjasama

Pesan 2 — INFO PENTING (list format, ringkas):
- Cara order (WA CS / katalog / group WA reseller)
- Payment term (transfer dulu / konsinyasi / dll)
- Delivery info
- Kontak person ops & sales

Pesan 3 — NEXT STEP:
- Konfirmasi first order
- Ajak join group WA reseller (jangan kasih link palsu — bilang "nanti admin invite")
- Buka pintu untuk pertanyaan

Bahasa Indonesia profesional tapi hangat. Kalo outlet gym/fitness → boleh lebih akrab (kaya sesama fitness enthusiast).`,
  buildUserPrompt: (i) => `Outlet: ${i.outletName} (${i.outletType})
PIC: ${i.picName}${i.initialOrder ? `\nFirst order: ${i.initialOrder}` : ""}${i.specialTerms ? `\nTerm khusus: ${i.specialTerms}` : ""}

Bikin 3 pesan onboarding sesuai struktur.`,
  model: "claude-sonnet-5",
  maxTokens: 1500,
};
