export interface templateIdConfig {
  templateId: string;
  hostElementId: string;
  newElementId?: string;
}

export interface Validate {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface UserInput {
  title: string;
  description: string;
  people: number;
}
