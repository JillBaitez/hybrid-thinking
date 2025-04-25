import { Stage, Snapshot, Workflow, ValidatorStatus } from '../types/workflow';

export const mockStages: Stage[] = [
  {
    id: 'stage-1',
    name: 'Ideate',
    icon: '💡',
    status: 'Complete',
    summary: 'Generated 5 concepts',
    prompt: 'Generate 5 unique product ideas for a smart home device that enhances productivity.',
    output: 'Here are 5 unique product ideas for smart home devices:\n1. Voice-activated Priority Planner\n2. Ambient Focus Lighting System\n3. Smart Desk Organization Assistant\n4. Environmental Productivity Monitor\n5. Digital Task Collaboration Hub',
    validatorStatus: 'Pass',
    metadata: {
      createdAt: '2023-11-10T15:30:00Z',
      updatedAt: '2023-11-10T15:35:00Z',
      isPartOfGeneration: true,
      generationId: 'gen-123'
    }
  },
  {
    id: 'stage-2',
    name: 'Generate',
    icon: '⚙️',
    status: 'Complete',
    summary: 'Detailed specs created',
    prompt: 'Elaborate on the "Ambient Focus Lighting System" concept. Include key features, target users, and potential implementation challenges.',
    output: 'The Ambient Focus Lighting System is a smart lighting solution that automatically adjusts brightness, color temperature, and direction based on your current task and time of day.\n\nKey Features:\n- Task detection via computer/phone usage patterns\n- Circadian rhythm optimization\n- Focus/break mode transitions\n- Subtle productivity cues through color shifts\n- Voice and app control\n\nTarget Users:\n- Remote knowledge workers\n- Students\n- Creative professionals\n- People with ADHD or focus challenges\n\nImplementation Challenges:\n- Accurate task detection without being intrusive\n- Light calibration for different room layouts\n- Battery life for wireless components\n- Integration with existing smart home ecosystems',
    validatorStatus: 'Pass',
    metadata: {
      createdAt: '2023-11-10T15:40:00Z',
      updatedAt: '2023-11-10T15:48:00Z',
      isPartOfGeneration: true,
      generationId: 'gen-123'
    }
  },
  {
    id: 'stage-3',
    name: 'Validate',
    icon: '✓',
    status: 'In Progress',
    summary: 'Review in progress',
    prompt: 'Analyze the Ambient Focus Lighting System concept for technical feasibility, market potential, and innovation score.',
    output: 'Partial validation complete...\n\nTechnical Feasibility: 8/10\nThe core lighting technology exists, though the task detection AI would require significant development.\n\nMarket Potential: Analyzing...',
    validatorStatus: 'Not Run',
    metadata: {
      createdAt: '2023-11-10T15:50:00Z',
      updatedAt: '2023-11-10T15:52:00Z'
    }
  },
  {
    id: 'stage-4',
    name: 'Refine',
    icon: '🔄',
    status: 'Failed',
    summary: 'Refinement failed',
    prompt: 'Refine the Ambient Focus Lighting System concept to address the implementation challenges, especially around task detection.',
    output: 'Error: Unable to process refinement due to insufficient validation data.',
    validatorStatus: 'Fail',
    metadata: {
      createdAt: '2023-11-10T16:00:00Z',
      updatedAt: '2023-11-10T16:01:00Z'
    }
  },
  {
    id: 'stage-5',
    name: 'Execute',
    icon: '🚀',
    status: 'In Progress',
    summary: 'Pending previous stage',
    prompt: '',
    output: '',
    metadata: {
      createdAt: '2023-11-10T16:05:00Z',
      updatedAt: '2023-11-10T16:05:00Z'
    }
  }
];

export const mockSnapshots: Snapshot[] = [
  {
    id: 'snap-1',
    stageId: 'stage-1',
    prompt: 'Generate 3 unique product ideas for a smart home device.',
    output: 'Here are 3 unique product ideas:\n1. Smart Mirror Assistant\n2. Ambient Mood Lighting\n3. Automated Plant Care System',
    validatorStatus: 'Pass',
    createdAt: '2023-11-10T14:20:00Z',
    metadata: {
      author: 'User',
      version: '1.0'
    }
  },
  {
    id: 'snap-2',
    stageId: 'stage-2',
    prompt: 'Elaborate on the "Automated Plant Care System" concept. Include key features and target users.',
    output: 'The Automated Plant Care System is a smart device that monitors and takes care of your plants...',
    validatorStatus: 'Fail',
    createdAt: '2023-11-10T14:35:00Z',
    metadata: {
      author: 'User',
      version: '1.0'
    }
  }
];

export const mockCurrentWorkflow: Workflow = {
  id: 'workflow-1',
  name: 'Smart Home Product Ideation',
  description: 'Workflow for ideating and developing a new smart home product concept',
  stages: mockStages,
  createdAt: '2023-11-10T15:00:00Z',
  updatedAt: '2023-11-10T16:05:00Z'
};