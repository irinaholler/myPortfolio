# Required Workflow Diagram Images

The following images need to be added to the `frontend/public/` folder for the AI Automation section to display properly:

## Required Images:

1. **workflow-1-document-pipeline.png**
   - Used for: Document Processing workflow
   - Description: Shows the automated document processing pipeline with Google Drive, Pinecone Vector Store, and OpenAI embeddings

2. **workflow-2-ai-agent.png**
   - Used for: Lead Capture Flow and Lead Capture Configuration workflows
   - Description: Shows the complete AI Agent workflow with n8n, OpenAI Chat Model, Simple Memory, Google Sheets, and Pinecone integration

## Image Specifications:

- Format: PNG (recommended) or JPG
- Location: Place files directly in `frontend/public/` folder
- Naming: Must match exactly as listed above (case-sensitive)

## Current Status:

These images are referenced in:
- `frontend/src/utils/data.js` (workflow definitions)
- `frontend/public/case-study.html` (case study page)

Once these images are added to the public folder, they will automatically be displayed in the AI Automation section.
