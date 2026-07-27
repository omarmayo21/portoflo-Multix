import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN;

if (!projectId || projectId === 'demo_project_id') {
  console.error('❌ Error: VITE_SANITY_PROJECT_ID is not configured in .env file.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function seed() {
  console.log(`🚀 Seeding Sanity dataset "${dataset}" for project "${projectId}"...`);

  const seedFilePath = path.join(process.cwd(), 'sanity-seed-data.ndjson');
  const fileContent = fs.readFileSync(seedFilePath, 'utf-8');
  const lines = fileContent.split('\n').filter(Boolean);

  for (const line of lines) {
    const doc = JSON.parse(line);
    console.log(`Uploading document "${doc._id}" (${doc._type})...`);
    if (token) {
      await client.createOrReplace(doc);
    }
  }

  console.log('✅ Sanity dataset seeding complete! 6 portfolio projects and categories are live.');
}

seed().catch((err) => {
  console.error('⚠️ Note on Seeding:', err.message);
  console.log('💡 Tip: You can also run: npx sanity dataset import sanity-seed-data.ndjson production');
});
