import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

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

  // Step 1: Delete old demo landing pages that are no longer needed
  const oldLandingPages = ['landing-web-design', 'landing-ecommerce'];
  for (const id of oldLandingPages) {
    try {
      await client.delete(id);
      console.log(`🗑️  Deleted old landing page "${id}"`);
    } catch {
      console.log(`ℹ️  "${id}" already removed or not found.`);
    }
  }

  // Step 2: Upload all seed documents (creates or replaces)
  const seedFilePath = path.join(process.cwd(), 'sanity-seed-data.ndjson');
  const fileContent = fs.readFileSync(seedFilePath, 'utf-8');
  const lines = fileContent.split('\n').filter(Boolean);

  for (const line of lines) {
    const doc = JSON.parse(line);
    console.log(`✅ Uploading "${doc._id}" (${doc._type})`);
    await client.createOrReplace(doc);
  }

  console.log('\n🎉 Sanity dataset seeding complete!');
  console.log('   • 6 portfolio projects published');
  console.log('   • 1 production landing page (web-development)');
  console.log('   • Website settings & content synced');
}

seed().catch((err) => {
  console.error('⚠️ Seeding error:', err.message);
});
