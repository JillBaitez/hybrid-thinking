# Quick Start Guide for Workflow Explorer

This guide will help you quickly run the Workflow Explorer application and view it in your browser.

## Step 1: Open a Terminal/Command Prompt

Open a terminal or command prompt and navigate to the project directory:

```bash
cd C:\Users\Mahdi\WebstormProjects\Hybrid-thinking-webtool
```

## Step 2: Install Dependencies

If you haven't already installed the dependencies, run:

```bash
npm install
```

Wait for the installation to complete. This may take a few minutes depending on your internet connection.

## Step 3: Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

You should see output similar to this:

```
  VITE v6.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Step 4: Open in Browser

Open your web browser and navigate to:

**http://localhost:5173/**

You should now see the Workflow Explorer interface with the following components:

1. A header with the title "Galvanize Workflow Explorer"
2. A workflow overview showing the stages: Ideate, Generate, Validate, Refine, and Execute
3. Each stage has a status indicator (Complete, In Progress, or Failed)

## Step 5: Interact with the UI

- **Hover** over a stage to see a detailed preview
- **Click** on a stage to enter the detail view for that stage
- In detail view, you can see the prompt, output, and other information
- Click **Back to Overview** to return to the main view

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that no other application is using port 5173
3. Verify that you're using a modern browser (Chrome, Firefox, Edge, etc.)
4. If the server fails to start, try restarting your terminal and running the commands again

## Next Steps

Refer to the main README.md file for more detailed information about the project structure and available features.