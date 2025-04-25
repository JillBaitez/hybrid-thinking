import { Stage } from '../../types/workflow';
import { useWorkflow } from '../../context/WorkflowContext';

interface StagePreviewOverlayProps {
  stage: Stage;
  position: { x: number, y: number };
}

export const StagePreviewOverlay = ({ stage, position }: StagePreviewOverlayProps) => {
  const { getSnapshotsForStage, restorePromptFromSnapshot } = useWorkflow();
  const snapshots = getSnapshotsForStage(stage.id);

  return (
    <div 
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-[400px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y + 130}px`
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <span className="mr-2 text-xl">{stage.icon}</span>
          <h3 className="font-semibold text-lg">{stage.name}</h3>
        </div>
        <span className={`px-2 py-0.5 text-xs rounded ${
          stage.status === 'Complete' ? 'bg-green-100 text-green-800' : 
          stage.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {stage.status}
        </span>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Prompt</h4>
        <div className="bg-gray-50 p-2 rounded text-sm overflow-hidden max-h-[80px]">
          {stage.prompt || 'No prompt available'}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Output</h4>
        <div className="bg-gray-50 p-2 rounded text-sm overflow-hidden max-h-[120px]">
          {stage.output || 'No output available'}
        </div>
      </div>

      {snapshots.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Available Snapshots</h4>
          <div className="flex space-x-2">
            {snapshots.map(snapshot => (
              <button
                key={snapshot.id}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded"
                onClick={() => restorePromptFromSnapshot(stage.id, snapshot.id)}
              >
                Restore {new Date(snapshot.createdAt).toLocaleTimeString()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};