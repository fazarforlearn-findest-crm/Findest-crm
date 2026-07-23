export type DepartmentId = "marketing" | "sales" | "finance";

export type SkillInputType = "text" | "textarea" | "select" | "number";

export interface SkillInputField {
  name: string;
  label: string;
  type: SkillInputType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helperText?: string;
}

export type SkillInputValues = Record<string, string | number>;

export interface Skill {
  id: string;
  department: DepartmentId;
  name: string;
  tagline: string;
  inputs: SkillInputField[];
  systemPrompt: string;
  buildUserPrompt: (input: SkillInputValues) => string;
  model: "claude-sonnet-5" | "claude-haiku-4-5-20251001";
  maxTokens: number;
}

export type PublicSkill = Pick<Skill, "id" | "department" | "name" | "tagline" | "inputs">;

export function toPublicSkill(skill: Skill): PublicSkill {
  return {
    id: skill.id,
    department: skill.department,
    name: skill.name,
    tagline: skill.tagline,
    inputs: skill.inputs,
  };
}
