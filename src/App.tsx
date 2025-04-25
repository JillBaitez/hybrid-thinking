import './App.css';
import { WorkflowProvider } from './context/WorkflowContext';
import { WorkflowExplorer } from './components/workflow/WorkflowExplorer';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Galvanize Workflow Explorer</h1>
          <p className="text-gray-600">Hybrid Thinking Productivity Platform</p>
        </header>

        <main>
          <WorkflowProvider>
            <WorkflowExplorer />
          </WorkflowProvider>
        </main>
      </div>
    </div>
  )
}

export default App
