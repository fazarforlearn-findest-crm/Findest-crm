import type { DepartmentId } from "./skills/types";

export interface Department {
  id: DepartmentId;
  index: number;
  name: string;
  tagline: string;
  accentClass: string;
  accentHex: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: "marketing",
    index: 1,
    name: "Marketing & Content",
    tagline: "Konten yang jual, tanpa nunggu inspirasi.",
    accentClass: "text-crew-marketing",
    accentHex: "#E86A2C",
  },
  {
    id: "sales",
    index: 2,
    name: "Sales & Customer Service",
    tagline: "Balesan cepet, tone selalu pas.",
    accentClass: "text-crew-sales",
    accentHex: "#3B82C4",
  },
  {
    id: "finance",
    index: 3,
    name: "Finance & Reporting",
    tagline: "Angka jadi insight, laporan jadi cerita.",
    accentClass: "text-crew-finance",
    accentHex: "#4B9E6A",
  },
];

export function getDepartment(id: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.id === id);
}
