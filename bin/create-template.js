#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const projectName = args[0] || 'my-next-app';

if (!projectName) {
  console.error('Please specify a project name:');
  console.log('  npx create-next-app-template my-app');
  process.exit(1);
}

const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const templatePath = path.join(__dirname, '..');

console.log(`Creating a new Next.js app in ${projectPath}...`);

// Create project directory
if (fs.existsSync(projectPath)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectPath, { recursive: true });

// Copy template files
console.log('Copying template files...');
copyDirectory(templatePath, projectPath);

// Clean up template-specific files
const filesToRemove = [
  'bin',
  '.git',
  'node_modules',
  '.next',
  '.env.local',
];

filesToRemove.forEach(file => {
  const filePath = path.join(projectPath, file);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
  }
});

// Update package.json
const packageJsonPath = path.join(projectPath, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.name = projectName;
packageJson.version = '0.1.0';
packageJson.private = true;
delete packageJson.bin;
delete packageJson.keywords;
packageJson.description = `A Next.js application: ${projectName}`;
packageJson.author = 'Your Name <your.email@example.com>';
packageJson.repository = {
  type: 'git',
  url: `https://github.com/yourusername/${projectName}.git`
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Install dependencies
console.log('Installing dependencies...');
process.chdir(projectPath);

try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to install dependencies. Please run npm install manually.');
}

console.log('');
console.log(`Success! Created ${projectName} at ${projectPath}`);
console.log('');
console.log('Next steps:');
console.log(`  cd ${projectName}`);
console.log('  npm run dev');
console.log('');
console.log('Happy coding! 🚀');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  items.forEach(item => {
    // Skip certain directories and files
    if ([
      'node_modules',
      '.git',
      '.next',
      'bin',
      '.env.local',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*'
    ].includes(item)) {
      return;
    }

    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}