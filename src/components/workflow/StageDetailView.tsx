import { useState } from 'react';
import { Stage, Snapshot } from '../../types/workflow';
import { useWorkflow } from '../../context/WorkflowContext';

interface StageDetailViewProps {
  stage: Stage;
}

export const StageDetailView = ({ stage }: StageDetailViewProps) => {
  const { getSnapshotsForStage, restorePromptFromSnapshot, toggleOverviewMode } = useWorkflow();
  const [prompt, setPrompt] = useState(stage.prompt);
  const [showSnapshots, setShowSnapshots] = useState(false);
  
  const snapshots = getSnapshotsForStage(stage.id);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleRestore = (snapshot: Snapshot) => {
    setPrompt(snapshot.prompt);
    restorePromptFromSnapshot(stage.id, snapshot.id);
    setShowSnapshots(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{stage.icon}</span>
          <h2 className="text-xl font-semibold">{stage.name}</h2>
          <span className={`ml-3 px-2 py-0.5 text-xs rounded ${
            stage.status === 'Complete' ? 'bg-green-100 text-green-800' : 
            stage.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {stage.status}
          </span>
        </div>
        <button
          onClick={toggleOverviewMode}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Overview
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
            Prompt
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowSnapshots(!showSnapshots)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
            >
              {showSnapshots ? 'Hide Snapshots' : 'Show Snapshots'}
            </button>
            {stage.metadata.restoredFromSnapshotId && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                Restored from snapshot
              </span>
            )}
          </div>
        </div>
        <textarea
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your prompt here..."
        />
        {showSnapshots && snapshots.length > 0 && (
          <div className="mt-2 border border-gray-200 rounded-md p-3 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Snapshots</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {snapshots.map(snapshot => (
                <div key={snapshot.id} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                  <div className="text-xs text-gray-500">
                    {new Date(snapshot.createdAt).toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleRestore(snapshot)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-2">
          Output
        </label>
        <div
          id="output"
          className="w-full min-h-32 p-3 border border-gray-300 rounded-md bg-gray-50 whitespace-pre-wrap"
        >
          {stage.output || 'No output available yet.'}
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          {stage.validatorStatus && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Validator:</span>
              <span className={`px-2 py-0.5 text-xs rounded ${
                stage.validatorStatus === 'Pass' ? 'bg-green-100 text-green-800' : 
                stage.validatorStatus === 'Fail' ? 'bg-red-100 text-red-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {stage.validatorStatus}
              </span>
            </div>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Retry
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            disabled={stage.status === 'In Progress'}
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
};