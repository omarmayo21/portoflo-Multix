import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { deskStructure } from './src/sanity/deskStructure';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'demo_project_id';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'multix-studio-dashboard',
  title: 'Multix Studio Dashboard',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
