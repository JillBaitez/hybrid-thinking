import { useState } from 'react';
import { Stage, ValidatorStatus } from '../../types/workflow';
import { useWorkflow } from '../../context/WorkflowContext';

interface StageBoxProps {
  stage: Stage;
  onMouseEnter: (stageId: string) => void;
  onMouseLeave: () => void;
}

export const StageBox = ({ stage, onMouseEnter, onMouseLeave }: StageBoxProps) => {
  const { setCurrentStageId, currentStageId, isOverviewMode } = useWorkflow();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setCurrentStageId(stage.id);
  };

  const getStatusColor = (status: Stage['status']) => {
    switch (status) {
      case 'Complete': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getValidatorBadge = (status?: ValidatorStatus) => {
    if (!status) return null;
    
    const colors = {
      'Pass': 'bg-green-500',
      'Fail': 'bg-red-500',
      'Not Run': 'bg-gray-300',
    };
    
    return (
      <div className="absolute top-2 right-2">
        <div 
          className={`w-3 h-3 rounded-full ${colors[status]}`} 
          title={`Validator: ${status}`}
        />
      </div>
    );
  };

  const isActive = currentStageId === stage.id && !isOverviewMode;

  return (
    <div
      className={`relative flex flex-col p-4 rounded-lg shadow transition-all duration-200 min-w-[180px] max-w-[180px] h-[120px] mx-2 cursor-pointer
        ${isActive ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 bg-white hover:border-blue-300'}
        ${stage.status === 'Failed' ? 'border-red-200' : ''}
      `}
      onMouseEnter={() => onMouseEnter(stage.id)}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
      }}
    >
      <div className="flex items-center mb-2">
        <div className="mr-2 text-xl">{stage.icon}</div>
        <div className="font-semibold truncate">{stage.name}</div>
        <div className={`ml-auto h-2 w-2 rounded-full ${getStatusColor(stage.status)}`} />
      </div>

      <div className="text-sm text-gray-600 flex-grow">{stage.summary}</div>

      {/* Stage metadata indicators */}
      <div className="flex mt-2 text-xs text-gray-500">
        {stage.metadata.isPartOfGeneration && (
          <div className="mr-2" title="Part of saved generation">
            <span className="inline-block bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
              Gen
            </span>
          </div>
        )}
        
        {stage.metadata.restoredFromSnapshotId && (
          <div title="Restored from snapshot">
            <span className="inline-block bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
              Restored
            </span>
          </div>
        )}
      </div>

      {getValidatorBadge(stage.validatorStatus)}

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-10">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setShowDropdown(false)}>
            Restore
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setShowDropdown(false)}>
            Inject
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setShowDropdown(false)}>
            Compare History
          </button>
        </div>
      )}
    </div>
  );
};