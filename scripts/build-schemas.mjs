#!/usr/bin/env node
/**
 * Build script to prepare schemas for npm distribution
 * Copies all schemas to dist/schemas for publishing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const schemasSourceDir = path.join(rootDir, 'schemas');
const publicSchemasDir = path.join(rootDir, 'public', 'schemas');
const distDir = path.join(rootDir, 'dist', 'schemas');

/**
 * Recursively copy directory structure
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith('.json') || entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Main build function
 */
function build() {
  try {
    console.log('🏗️  Building schema distribution...\n');

    // Clean dist directory
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }

    // Copy all schemas from both locations
    console.log(`📋 Copying schemas from ${schemasSourceDir}...`);
    copyDir(schemasSourceDir, distDir);

    console.log(`📋 Copying generated schemas from ${publicSchemasDir}...`);
    copyDir(publicSchemasDir, path.join(distDir, '_generated'));

    // Count schemas
    const countSchemas = (dir) => {
      let count = 0;
      const walk = (d) => {
        const entries = fs.readdirSync(d, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            walk(path.join(d, entry.name));
          } else if (entry.name.endsWith('.schema.json')) {
            count++;
          }
        }
      };
      walk(dir);
      return count;
    };

    const schemaCount = countSchemas(distDir);

    console.log(`\n✅ Build complete!`);
    console.log(`   📦 Total schemas: ${schemaCount}`);
    console.log(`   📁 Output directory: ${distDir}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
