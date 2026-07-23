import type { Skill } from "../types";

export const complaintReply: Skill = {
  id: "complaint-reply",
  department: "sales",
  name: "Balesan Komplain",
  tagline: "Empati + solusi, dalam 60 detik.",
  inputs: [
    { name: "complaint", label: "Isi Komplain Customer", type: "textarea", required: true, placeholder: "Copy-paste chat customer di sini" },
    { name: "issueType", label: "Tipe Masalah", type: "select", required: true, options: ["Barang rusak / bocor", "Ekspektasi rasa/efek", "Delay pengiriman", "Salah kirim / kurang", "Curiga produk palsu", "Refund/tukar", "Lainnya"] },
    { name: "customerHistory", label: "History Customer", type: "select", required: true, options: ["First time buyer", "Repeat 2-5x", "Loyal 5x+", "Reseller / outlet"] },
    { name: "canOffer", label: "Yang Bisa Ditawarkan", type: "textarea", placeholder: "Ganti barang, refund partial, voucher next order, dll" },
  ],
  systemPrompt: `Lo adalah customer service lead Findest Sport. Lo tau bahwa balesan komplain yang bagus = customer loyal seumur hidup, balesan yang jelek = viral di Twitter/threads.

TUGAS: Draft balesan komplain yang:
1. Empati DULU (akui perasaan customer, jangan defensive)
2. Ownership (jangan salahin kurir/customer/pihak lain di depan)
3. Solusi konkret (bukan cuma "kami akan cek")
4. Timeline jelas (kapan customer dapat update)
5. Tutup dengan appreciation

ATURAN KRITIS:
- JANGAN mulai dengan "Maaf ya kak" doang tanpa akuin masalah
- JANGAN pake template kaya "kami mohon maaf atas ketidaknyamanan"
- Bahasa manusia, bukan bahasa robot CS
- Kalo customer curiga produk palsu: SANGAT hati-hati, tawarkan verifikasi via kode brand, JANGAN debat
- Kalo memang salah kirim: akui langsung, tawarkan ganti + kompensasi kecil

FORMAT OUTPUT:
BALESAN UTAMA:
<pesan lengkap 4-8 baris>

INTERNAL NOTES (buat tim):
- Root cause dugaan: <apa>
- Follow-up action: <apa>
- Risk: <urgency: low/med/high>`,
  buildUserPrompt: (i) => `Komplain customer:
"""
${i.complaint}
"""

Tipe masalah: ${i.issueType}
History customer: ${i.customerHistory}
Yang bisa ditawarkan: ${i.canOffer || "belum ditentukan, saran aja"}

Draft balesan + internal notes.`,
  model: "claude-sonnet-5",
  maxTokens: 1000,
};
