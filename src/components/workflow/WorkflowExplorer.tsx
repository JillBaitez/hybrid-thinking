import { useState, useRef } from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { StageBox } from './StageBox';
import { StagePreviewOverlay } from './StagePreviewOverlay';
import { StageDetailView } from './StageDetailView';

export const WorkflowExplorer = () => {
  const { workflow, currentStageId, isOverviewMode } = useWorkflow();
  const [hoverStageId, setHoverStageId] = useState<string | null>(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const railRef = useRef<HTMLDivElement>(null);

  const handleStageMouseEnter = (stageId: string) => {
    if (!railRef.current) return;
    
    const stageElement = railRef.current.querySelector(`[data-stage-id="${stageId}"]`);
    if (stageElement) {
      const rect = stageElement.getBoundingClientRect();
      setOverlayPosition({ 
        x: Math.max(0, rect.left - 100), 
        y: rect.top 
      });
    }
    
    setHoverStageId(stageId);
  };

  const handleStageMouseLeave = () => {
    setHoverStageId(null);
  };

  const currentStage = currentStageId 
    ? workflow.stages.find(stage => stage.id === currentStageId)
    : null;

  const hoveredStage = hoverStageId
    ? workflow.stages.find(stage => stage.id === hoverStageId)
    : null;

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <h1 className="text-xl font-bold">{workflow.name}</h1>
        <p className="text-gray-600">{workflow.description}</p>
      </div>

      {isOverviewMode ? (
        <>
          {/* Overview Mode */}
          <div 
            ref={railRef}
            className="flex overflow-x-auto pb-6 pt-2 px-4 bg-white rounded-lg shadow-sm"
            style={{ scrollbarWidth: 'thin' }}
          >
            {workflow.stages.map((stage) => (
              <div key={stage.id} data-stage-id={stage.id}>
                <StageBox
                  stage={stage}
                  onMouseEnter={handleStageMouseEnter}
                  onMouseLeave={handleStageMouseLeave}
                />
              </div>
            ))}
          </div>

          {/* Preview Overlay */}
          {hoveredStage && hoverStageId && (
            <StagePreviewOverlay
              stage={hoveredStage}
              position={overlayPosition}
            />
          )}
        </>
      ) : (
        /* Detail View Mode */
        currentStage && <StageDetailView stage={currentStage} />
      )}
    </div>
  );
};