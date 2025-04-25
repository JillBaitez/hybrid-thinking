export type StageStatus = 'In Progress' | 'Complete' | 'Failed';
export type ValidatorStatus = 'Pass' | 'Fail' | 'Not Run';

export interface Stage {
  id: string;
  name: string;
  icon: string;
  status: StageStatus;
  summary: string;
  prompt: string;
  output: string;
  validatorStatus?: ValidatorStatus;
  metadata: {
    createdAt: string;
    updatedAt: string;
    isPartOfGeneration?: boolean;
    generationId?: string;
    restoredFromSnapshotId?: string;
  };
}

export interface Snapshot {
  id: string;
  stageId: string;
  prompt: string;
  output: string;
  validatorStatus?: ValidatorStatus;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  stages: Stage[];
  createdAt: string;
  updatedAt: string;
}