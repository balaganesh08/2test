export type MilestoneStage = 
  | "New Lead"
  | "Conversion"
  | "Survey"
  | "Production" 
  | "Delivery & Installation"
  | "Closed";

export interface MilestoneStep {
  title: string;
  description: string;
  completed: boolean;
}

export interface StageConfig {
  title: string;
  totalSteps: number;
  steps: MilestoneStep[];
}
