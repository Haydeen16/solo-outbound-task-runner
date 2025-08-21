export type StepType = 'call' | 'email' | 'linkedin' | 'task';

export interface CadenceStep {
  id: string;
  label: string;
  type: StepType;
  offsetDays: number;
  notes?: string;
}

export interface Cadence {
  id: string;
  name: string;
  steps: CadenceStep[];
}

export interface Interaction {
  date: string; // ISO timestamp
  stepId: string;
  disposition?: string;
  outcome?: string;
  notes?: string;
}

export interface Person {
  id: string;
  name: string;
  account: string;
  email?: string;
  phone?: string;
  cadenceId: string;
  startDate: string; // YYYY-MM-DD
  stepIndex: number;
  active: boolean;
  nextDueOverride?: string;
  history: Interaction[];
}

export interface Account {
  id: string;
  account: string;
  domain?: string;
  phone?: string;
  notes?: string;
}

export interface Task {
  personId: string;
  personName: string;
  account: string;
  cadenceId: string;
  stepId: string;
  stepIndex: number;
  stepLabel: string;
  type: StepType;
  dueDate: string;
  notes?: string;
}
