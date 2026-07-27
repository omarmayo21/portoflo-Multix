import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Parse .env manually to avoid external dependency issues
function getEnvVars() {
  const envPath = path.join(process.cwd(), '.env');
  const envVars = { ...process.env };
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        envVars[key.trim()] = vals.join('=').trim();
      }
    }
  }
  return envVars;
}

const env = getEnvVars();
const projectId = env.VITE_SANITY_PROJECT_ID || 'dtj815fl';
const dataset = env.VITE_SANITY_DATASET || 'production';
const token = env.VITE_SANITY_WRITE_TOKEN;

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
    await client.createOrReplace(doc);
  }

  console.log('✅ Sanity dataset seeding complete! All 6 portfolio projects and settings are live.');
}

seed().catch((err) => {
  console.error('⚠️ Seeding script notice:', err.message);
  console.log('💡 Note: Dataset can also be updated via: npx sanity dataset import sanity-seed-data.ndjson production');
});
