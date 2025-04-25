import { createContext, useContext, useState, ReactNode } from 'react';
import { Stage, Snapshot, Workflow } from '../types/workflow';
import { mockCurrentWorkflow, mockSnapshots } from '../mocks/workflowData';

interface WorkflowContextType {
  workflow: Workflow;
  currentStageId: string | null;
  isOverviewMode: boolean;
  snapshots: Snapshot[];
  setCurrentStageId: (id: string | null) => void;
  toggleOverviewMode: () => void;
  getSnapshotsForStage: (stageId: string) => Snapshot[];
  restorePromptFromSnapshot: (stageId: string, snapshotId: string) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [workflow, setWorkflow] = useState<Workflow>(mockCurrentWorkflow);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const [isOverviewMode, setIsOverviewMode] = useState<boolean>(true);
  const [snapshots] = useState<Snapshot[]>(mockSnapshots);

  const toggleOverviewMode = () => {
    setIsOverviewMode(prev => !prev);
  };

  const getSnapshotsForStage = (stageId: string): Snapshot[] => {
    return snapshots.filter(snapshot => snapshot.stageId === stageId);
  };

  const restorePromptFromSnapshot = (stageId: string, snapshotId: string) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (!snapshot) return;

    setWorkflow(prev => {
      const updatedStages = prev.stages.map(stage => {
        if (stage.id === stageId) {
          return {
            ...stage,
            prompt: snapshot.prompt,
            metadata: {
              ...stage.metadata,
              restoredFromSnapshotId: snapshotId,
              updatedAt: new Date().toISOString()
            }
          };
        }
        return stage;
      });

      return {
        ...prev,
        stages: updatedStages,
        updatedAt: new Date().toISOString()
      };
    });
  };

  return (
    <WorkflowContext.Provider
      value={{
        workflow,
        currentStageId,
        isOverviewMode,
        snapshots,
        setCurrentStageId,
        toggleOverviewMode,
        getSnapshotsForStage,
        restorePromptFromSnapshot
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};