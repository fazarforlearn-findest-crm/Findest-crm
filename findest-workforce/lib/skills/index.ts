import { captionInstagram } from "./marketing/caption-instagram";
import { contentCalendar } from "./marketing/content-calendar";
import { productDescription } from "./marketing/product-description";
import { promoWeekly } from "./marketing/promo-weekly";

import { complaintReply } from "./sales/complaint-reply";
import { salesPitch } from "./sales/sales-pitch";
import { waFollowUp } from "./sales/wa-follow-up";
import { waOutletOnboard } from "./sales/wa-outlet-onboard";

import { cashflowForecast } from "./finance/cashflow-forecast";
import { expenseCategorizer } from "./finance/expense-categorizer";
import { monthlySummary } from "./finance/monthly-summary";
import { piutangAnalysis } from "./finance/piutang-analysis";

import type { DepartmentId, Skill } from "./types";

export const SKILLS: Skill[] = [
  productDescription,
  captionInstagram,
  promoWeekly,
  contentCalendar,
  waFollowUp,
  waOutletOnboard,
  complaintReply,
  salesPitch,
  piutangAnalysis,
  expenseCategorizer,
  monthlySummary,
  cashflowForecast,
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function skillsByDepartment(dept: DepartmentId): Skill[] {
  return SKILLS.filter((s) => s.department === dept);
}
