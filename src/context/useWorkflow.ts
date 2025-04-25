import { useContext } from 'react';
import { WorkflowContext, WorkflowContextType } from './WorkflowContext';

// Custom hook to access the workflow context
export const useWorkflow = (): WorkflowContextType => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
