import { createContext } from 'react';
import { Snapshot, Workflow } from '../types/workflow';

// Define the context type
export interface WorkflowContextType {
  workflow: Workflow;
  currentStageId: string | null;
  isOverviewMode: boolean;
  snapshots: Snapshot[];
  setCurrentStageId: (id: string | null) => void;
  toggleOverviewMode: () => void;
  getSnapshotsForStage: (stageId: string) => Snapshot[];
  restorePromptFromSnapshot: (stageId: string, snapshotId: string) => void;
}

// Create the context with an undefined default value
export const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);
