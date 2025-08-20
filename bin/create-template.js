#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const projectName = args[0] || 'my-next-app';

if (!projectName) {
  console.error('Please specify a project name:');
  console.log('  npx create-webbx-app my-app');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const TAILWIND_VERSIONS = {
  v3: {
    'tailwindcss': '^3.4.17',
    'autoprefixer': '^10.4.21',
    'postcss': '^8.5.6',
    'tailwindcss-animate': '^1.0.7'
  },
  v4: {
    'tailwindcss': '^4.0.0-beta.24',
    '@tailwindcss/vite': '^4.0.0-beta.24'
  }
};

const OPTIONAL_PACKAGES = {
  icons: {
    '@heroicons/react': '^2.2.0',
    'lucide-react': '^0.513.0'
  },
  stateManagement: {
    'zustand': '^5.0.7'
  },
  dataFetching: {
    '@tanstack/react-query': '^5.85.2'
  },
  animation: {
    'framer-motion': '^12.23.12'
  },
  charts: {
    'chart.js': '^4.5.0',
    'react-chartjs-2': '^5.3.0',
    'chroma-js': '3.1.2'
  },
  ui: {
    v3: {
      '@heroui/react': '^2.8.2',
      '@radix-ui/react-dialog': '^1.1.15'
    },
    v4: {
      '@heroui/react': '^2.8.2',
      '@radix-ui/react-dialog': '^1.1.15'
    }
  },
  shadcnUI: {
    '@radix-ui/react-slot': '^1.1.0',
    '@radix-ui/react-toast': '^1.2.2',
    '@radix-ui/react-tooltip': '^1.1.3',
    '@radix-ui/react-dropdown-menu': '^2.1.2',
    '@radix-ui/react-select': '^2.1.2',
    '@radix-ui/react-checkbox': '^1.1.2',
    '@radix-ui/react-switch': '^1.1.1',
    '@radix-ui/react-tabs': '^1.1.1',
    '@radix-ui/react-accordion': '^1.2.1',
    '@radix-ui/react-avatar': '^1.1.1',
    '@radix-ui/react-progress': '^1.1.0',
    'class-variance-authority': '^0.7.1',
    'clsx': '^2.1.1',
    'tailwind-merge': '^3.3.1'
  },
  fileHandling: {
    'react-dropzone': '^14.3.8',
    'html2canvas': '^1.4.1',
    'jspdf': '^3.0.1'
  },
  monitoring: {
    '@sentry/nextjs': '^10.5.0'
  },
  devTools: {
    '@tanstack/react-query-devtools': '^5.85.2'
  }
};

const SHADCN_COMPONENTS = {
  button: { name: 'Button', file: 'button.tsx' },
  input: { name: 'Input', file: 'input.tsx' },
  card: { name: 'Card', file: 'card.tsx' },
  badge: { name: 'Badge', file: 'badge.tsx' },
  alert: { name: 'Alert', file: 'alert.tsx' },
  avatar: { name: 'Avatar', file: 'avatar.tsx' },
  checkbox: { name: 'Checkbox', file: 'checkbox.tsx' },
  dropdown: { name: 'Dropdown Menu', file: 'dropdown-menu.tsx' },
  select: { name: 'Select', file: 'select.tsx' },
  switch: { name: 'Switch', file: 'switch.tsx' },
  tabs: { name: 'Tabs', file: 'tabs.tsx' },
  toast: { name: 'Toast', file: 'toast.tsx' },
  tooltip: { name: 'Tooltip', file: 'tooltip.tsx' },
  accordion: { name: 'Accordion', file: 'accordion.tsx' },
  progress: { name: 'Progress', file: 'progress.tsx' }
};

function detectPackageManager() {
  try {
    execSync('bun --version', { stdio: 'ignore' });
    return 'bun';
  } catch {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch {
      return 'npm';
    }
  }
}

function getInstallCommand(packageManager) {
  switch (packageManager) {
    case 'bun':
      return 'bun install';
    case 'yarn':
      return 'yarn install';
    default:
      return 'npm install';
  }
}

function getAddCommand(packageManager, packages) {
  const packageList = Array.isArray(packages) ? packages.join(' ') : packages;
  switch (packageManager) {
    case 'bun':
      return `bun add ${packageList}`;
    case 'yarn':
      return `yarn add ${packageList}`;
    default:
      return `npm install ${packageList}`;
  }
}

async function main() {
  const currentPath = process.cwd();
  const projectPath = path.join(currentPath, projectName);
  const templatePath = path.join(__dirname, '..');

  console.log('\n🚀 Welcome to Next.js App Template Generator!\n');
  console.log(`Creating a new Next.js app: ${projectName}\n`);

  // Create project directory
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Directory ${projectName} already exists.`);
    process.exit(1);
  }

  // Detect and select package manager
  const detectedPM = detectPackageManager();
  console.log(`📦 Detected package manager: ${detectedPM}`);
  
  const useDifferentPM = await question(`  Use ${detectedPM} for package management? [Y/n]: `);
  let packageManager = detectedPM;
  
  if (useDifferentPM.toLowerCase() === 'n') {
    console.log('\n📦 Available package managers:');
    console.log('  1. bun (fastest)');
    console.log('  2. yarn (stable)');
    console.log('  3. npm (default)');
    
    const pmChoice = await question('  Choose package manager [1-3]: ');
    switch (pmChoice) {
      case '1': packageManager = 'bun'; break;
      case '2': packageManager = 'yarn'; break;
      case '3': packageManager = 'npm'; break;
      default: packageManager = detectedPM; break;
    }
  }
  
  console.log(`✅ Using ${packageManager} for package management\n`);

  // Tailwind version selection
  const tailwindVersion = await selectTailwindVersion();

  // Interactive package selection
  const selectedPackages = await selectPackages();

  console.log(`\n📁 Creating project directory: ${projectPath}...`);
  fs.mkdirSync(projectPath, { recursive: true });

  // Copy template files
  console.log('📋 Copying template files...');
  copyDirectory(templatePath, projectPath);

  // Clean up template-specific files and update package.json
  await setupProject(projectPath, selectedPackages, packageManager, tailwindVersion);

  rl.close();
}

async function selectTailwindVersion() {
  console.log('🎨 TAILWIND CSS VERSION:');
  console.log('  1. Tailwind CSS v3 (stable, widely supported)');
  console.log('  2. Tailwind CSS v4 (beta, modern features)');
  
  const versionChoice = await question('  Choose Tailwind version [1-2]: ');
  
  switch (versionChoice) {
    case '2':
      console.log('✅ Selected Tailwind CSS v4 (beta)\n');
      return 'v4';
    case '1':
    default:
      console.log('✅ Selected Tailwind CSS v3 (stable)\n');
      return 'v3';
  }
}

async function selectPackages() {
  console.log('🎯 Choose which packages to include in your project:\n');
  
  const selections = {};
  
  // Icons
  console.log('📦 ICON LIBRARIES:');
  const useIcons = await question('  Include icon libraries? (Heroicons + Lucide React) [Y/n]: ');
  selections.icons = useIcons.toLowerCase() !== 'n';
  
  // State Management
  console.log('\n🔄 STATE MANAGEMENT:');
  const useZustand = await question('  Include Zustand for state management? [Y/n]: ');
  selections.stateManagement = useZustand.toLowerCase() !== 'n';
  
  // Data Fetching
  console.log('\n🌐 DATA FETCHING:');
  const useReactQuery = await question('  Include TanStack Query for data fetching? [Y/n]: ');
  selections.dataFetching = useReactQuery.toLowerCase() !== 'n';
  
  // Animation
  console.log('\n✨ ANIMATIONS:');
  const useFramerMotion = await question('  Include Framer Motion for animations? [Y/n]: ');
  selections.animation = useFramerMotion.toLowerCase() !== 'n';
  
  // Charts
  console.log('\n📊 CHARTS:');
  const useCharts = await question('  Include Chart.js for data visualization? [y/N]: ');
  selections.charts = useCharts.toLowerCase() === 'y';
  
  // UI Components
  console.log('\n🎨 UI COMPONENTS:');
  const useUILibs = await question('  Include UI libraries? (HeroUI + Radix UI) [y/N]: ');
  selections.ui = useUILibs.toLowerCase() === 'y';
  
  // File Handling
  console.log('\n📁 FILE HANDLING:');
  const useFileHandling = await question('  Include file handling? (Dropzone + PDF generation) [y/N]: ');
  selections.fileHandling = useFileHandling.toLowerCase() === 'y';
  
  // ShadCN UI
  console.log('\n🎨 SHADCN UI:');
  const useShadcn = await question('  Include ShadCN UI components? [Y/n]: ');
  selections.shadcnUI = useShadcn.toLowerCase() !== 'n';
  
  if (selections.shadcnUI) {
    console.log('\n🧩 ShadCN Components:');
    const componentChoice = await question('  1. All components\n  2. Select specific components\n  3. Skip components (setup only)\n  Choose [1-3]: ');
    
    if (componentChoice === '1') {
      selections.shadcnComponents = Object.keys(SHADCN_COMPONENTS);
    } else if (componentChoice === '2') {
      selections.shadcnComponents = await selectShadcnComponents();
    } else {
      selections.shadcnComponents = [];
    }
  }

  // Monitoring
  console.log('\n📊 MONITORING:');
  const useSentry = await question('  Include Sentry for error monitoring? [y/N]: ');
  selections.monitoring = useSentry.toLowerCase() === 'y';
  
  return selections;
}

async function selectShadcnComponents() {
  console.log('\n🧩 Select ShadCN components to include:\n');
  const selectedComponents = [];
  
  const componentEntries = Object.entries(SHADCN_COMPONENTS);
  for (let i = 0; i < componentEntries.length; i++) {
    const [key, component] = componentEntries[i];
    const include = await question(`  Include ${component.name}? [y/N]: `);
    if (include.toLowerCase() === 'y') {
      selectedComponents.push(key);
    }
  }
  
  return selectedComponents;
}

async function setupProject(projectPath, selectedPackages, packageManager, tailwindVersion) {
  console.log('🧹 Cleaning up template files...');
  
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

  console.log('⚙️ Updating package.json...');
  
  // Update package.json with selected packages
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Base package.json updates
  packageJson.name = projectName;
  packageJson.version = '0.1.0';
  packageJson.private = true;
  delete packageJson.bin;
  delete packageJson.keywords;
  delete packageJson.repository;
  delete packageJson.bugs;
  delete packageJson.homepage;
  packageJson.description = `A Next.js application: ${projectName}`;
  packageJson.author = 'Your Name <your.email@example.com>';

  // Handle Tailwind CSS version
  // Remove existing Tailwind packages
  delete packageJson.dependencies.tailwindcss;
  delete packageJson.dependencies.autoprefixer;
  delete packageJson.dependencies.postcss;
  delete packageJson.dependencies['@tailwindcss/vite'];
  delete packageJson.devDependencies.tailwindcss;
  delete packageJson.devDependencies.autoprefixer;
  delete packageJson.devDependencies.postcss;
  delete packageJson.devDependencies['@tailwindcss/vite'];

  // Add selected Tailwind version packages
  Object.entries(TAILWIND_VERSIONS[tailwindVersion]).forEach(([pkg, version]) => {
    packageJson.devDependencies[pkg] = version;
  });

  // Remove all optional packages first
  Object.values(OPTIONAL_PACKAGES).forEach(packages => {
    Object.keys(packages).forEach(pkg => {
      delete packageJson.dependencies[pkg];
      delete packageJson.devDependencies[pkg];
    });
  });

  // Add selected packages back
  Object.entries(selectedPackages).forEach(([category, isSelected]) => {
    if (isSelected && OPTIONAL_PACKAGES[category]) {
      const packages = OPTIONAL_PACKAGES[category];
      
      // Handle packages that have different versions for Tailwind v3/v4
      if (packages.v3 && packages.v4) {
        const versionedPackages = packages[tailwindVersion] || packages.v3;
        Object.entries(versionedPackages).forEach(([pkg, version]) => {
          if (pkg === '@tanstack/react-query-devtools') {
            packageJson.devDependencies[pkg] = version;
          } else {
            packageJson.dependencies[pkg] = version;
          }
        });
      } else {
        // Handle regular packages
        Object.entries(packages).forEach(([pkg, version]) => {
          if (pkg === '@tanstack/react-query-devtools') {
            packageJson.devDependencies[pkg] = version;
          } else {
            packageJson.dependencies[pkg] = version;
          }
        });
      }
    }
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Clean up unused components and files based on selections
  cleanupUnusedFiles(projectPath, selectedPackages);

  console.log(`📦 Installing dependencies with ${packageManager}...`);
  process.chdir(projectPath);

  try {
    const installCmd = getInstallCommand(packageManager);
    execSync(installCmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`⚠️  Failed to install dependencies. Please run ${getInstallCommand(packageManager)} manually.`);
  }

  // Setup Tailwind configuration
  await setupTailwindConfig(projectPath, tailwindVersion, selectedPackages);

  // Setup ShadCN UI if selected
  if (selectedPackages.shadcnUI) {
    await setupShadcnUI(projectPath, selectedPackages, packageManager, tailwindVersion);
  }

  console.log('');
  console.log(`✅ Success! Created ${projectName} at ${projectPath}`);
  console.log('');
  console.log('📋 Selected packages:');
  Object.entries(selectedPackages).forEach(([category, isSelected]) => {
    if (isSelected) {
      const packages = Object.keys(OPTIONAL_PACKAGES[category] || {});
      console.log(`  ✓ ${category}: ${packages.join(', ')}`);
    }
  });
  console.log('');
  console.log('🚀 Next steps:');
  console.log(`  cd ${projectName}`);
  console.log(`  ${packageManager === 'npm' ? 'npm run dev' : packageManager === 'yarn' ? 'yarn dev' : 'bun dev'}`);
  console.log('');
  console.log('Happy coding! 🎉');
}

async function setupTailwindConfig(projectPath, tailwindVersion, selectedPackages) {
  console.log(`🎨 Setting up Tailwind CSS ${tailwindVersion}...`);

  if (tailwindVersion === 'v4') {
    // Tailwind CSS v4 setup
    await setupTailwindV4(projectPath, selectedPackages);
  } else {
    // Tailwind CSS v3 setup (default)
    await setupTailwindV3(projectPath, selectedPackages);
  }

  console.log(`✅ Tailwind CSS ${tailwindVersion} configured!`);
}

async function setupTailwindV3(projectPath, selectedPackages) {
  // Create tailwind.config.js for v3
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")${selectedPackages.ui ? ', require("@tailwindcss/forms")' : ''}],
}`;

  fs.writeFileSync(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);

  // Create/update postcss.config.mjs
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

  fs.writeFileSync(path.join(projectPath, 'postcss.config.mjs'), postcssConfig);
}

async function setupTailwindV4(projectPath, selectedPackages) {
  // Tailwind v4 uses CSS-based configuration
  const globalsPath = path.join(projectPath, 'src', 'app', 'globals.css');
  let globalsContent = fs.readFileSync(globalsPath, 'utf8');
  
  // Replace existing Tailwind imports with v4 syntax
  globalsContent = globalsContent.replace(
    /@tailwind base;\n@tailwind components;\n@tailwind utilities;/g,
    '@import "tailwindcss";'
  );

  // Add Tailwind v4 theme configuration
  const tailwindV4Config = `
@theme {
  --font-family-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  
  --color-border: oklch(0.5 0.1 0);
  --color-input: oklch(0.5 0.1 0);
  --color-ring: oklch(0.3 0.2 0);
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.15 0.05 0);
  
  --color-primary: oklch(0.3 0.2 0);
  --color-primary-foreground: oklch(0.98 0.01 0);
  
  --color-secondary: oklch(0.96 0.01 0);
  --color-secondary-foreground: oklch(0.3 0.2 0);
  
  --color-destructive: oklch(0.6 0.2 0);
  --color-destructive-foreground: oklch(0.98 0.01 0);
  
  --color-muted: oklch(0.96 0.01 0);
  --color-muted-foreground: oklch(0.5 0.1 0);
  
  --color-accent: oklch(0.96 0.01 0);
  --color-accent-foreground: oklch(0.3 0.2 0);
  
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.15 0.05 0);
  
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.15 0.05 0);
  
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.15 0.05 0);
    --color-foreground: oklch(0.98 0.01 0);
    --color-card: oklch(0.15 0.05 0);
    --color-card-foreground: oklch(0.98 0.01 0);
    --color-popover: oklch(0.15 0.05 0);
    --color-popover-foreground: oklch(0.98 0.01 0);
    --color-primary: oklch(0.98 0.01 0);
    --color-primary-foreground: oklch(0.3 0.2 0);
    --color-secondary: oklch(0.2 0.1 0);
    --color-secondary-foreground: oklch(0.98 0.01 0);
    --color-muted: oklch(0.2 0.1 0);
    --color-muted-foreground: oklch(0.65 0.1 0);
    --color-accent: oklch(0.2 0.1 0);
    --color-accent-foreground: oklch(0.98 0.01 0);
    --color-destructive: oklch(0.3 0.2 0);
    --color-destructive-foreground: oklch(0.98 0.01 0);
    --color-border: oklch(0.2 0.1 0);
    --color-input: oklch(0.2 0.1 0);
    --color-ring: oklch(0.83 0.05 0);
  }
}`;

  // Only add v4 config if not already present
  if (!globalsContent.includes('@theme {')) {
    globalsContent += tailwindV4Config;
  }

  fs.writeFileSync(globalsPath, globalsContent);

  // Create next.config.ts with Tailwind v4 integration
  const nextConfigPath = path.join(projectPath, 'next.config.ts');
  let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  
  // Add Tailwind v4 plugin to next.config.ts
  if (!nextConfig.includes('@tailwindcss/vite')) {
    nextConfig = nextConfig.replace(
      'import type { NextConfig } from "next";',
      `import type { NextConfig } from "next";
import tailwindcss from '@tailwindcss/vite';`
    );

    nextConfig = nextConfig.replace(
      'const nextConfig: NextConfig = {',
      `const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },`
    );

    // Add webpack configuration for Tailwind v4
    nextConfig = nextConfig.replace(
      'export default nextConfig;',
      `  webpack: (config) => {
    config.plugins?.push(tailwindcss());
    return config;
  },
};

export default nextConfig;`
    );

    fs.writeFileSync(nextConfigPath, nextConfig);
  }
}

async function setupShadcnUI(projectPath, selectedPackages, packageManager, tailwindVersion) {
  console.log('🎨 Setting up ShadCN UI...');

  // Create components.json for ShadCN with Tailwind version-specific config
  const componentsConfig = {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "default",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": tailwindVersion === 'v4' ? "src/app/globals.css" : "tailwind.config.js",
      "css": "src/app/globals.css",
      "baseColor": "slate",
      "cssVariables": true,
      "cssVariablesPrefix": tailwindVersion === 'v4' ? "--color-" : "",
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils"
    }
  };

  fs.writeFileSync(
    path.join(projectPath, 'components.json'),
    JSON.stringify(componentsConfig, null, 2)
  );

  // Create ShadCN utils file
  const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  const libDir = path.join(projectPath, 'src', 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(libDir, 'utils.ts'), utilsContent);

  // Update globals.css with ShadCN styles (only for v3, v4 already has colors configured)
  if (tailwindVersion === 'v3') {
    const globalsPath = path.join(projectPath, 'src', 'app', 'globals.css');
    let globalsContent = fs.readFileSync(globalsPath, 'utf8');
    
    const shadcnStylesV3 = `
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

    // Add ShadCN styles to globals.css if not already present
    if (!globalsContent.includes('--background:')) {
      globalsContent += shadcnStylesV3;
      fs.writeFileSync(globalsPath, globalsContent);
    }
  }

  // Install selected ShadCN components
  if (selectedPackages.shadcnComponents && selectedPackages.shadcnComponents.length > 0) {
    console.log('🧩 Installing selected ShadCN components...');
    
    // Create components/ui directory
    const uiDir = path.join(projectPath, 'src', 'components', 'ui');
    if (!fs.existsSync(uiDir)) {
      fs.mkdirSync(uiDir, { recursive: true });
    }

    // Generate component files
    for (const componentKey of selectedPackages.shadcnComponents) {
      const component = SHADCN_COMPONENTS[componentKey];
      if (component) {
        await createShadcnComponent(projectPath, componentKey, component);
      }
    }
  }

  console.log('✅ ShadCN UI setup complete!');
}

async function createShadcnComponent(projectPath, componentKey, component) {
  const uiDir = path.join(projectPath, 'src', 'components', 'ui');
  const componentPath = path.join(uiDir, component.file);

  // Basic component templates
  const componentTemplates = {
    button: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,

    input: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,

    card: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`
  };

  // Get component template or create a basic one
  let componentContent = componentTemplates[componentKey];
  
  if (!componentContent) {
    // Create a basic component template if we don't have a specific one
    componentContent = `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ${component.name}Props extends React.HTMLAttributes<HTMLDivElement> {}

const ${component.name} = React.forwardRef<HTMLDivElement, ${component.name}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
${component.name}.displayName = "${component.name}"

export { ${component.name} }`;
  }

  fs.writeFileSync(componentPath, componentContent);
  console.log(`  ✅ Created ${component.name} component`);
}

function cleanupUnusedFiles(projectPath, selectedPackages) {
  // Remove chart components if charts not selected
  if (!selectedPackages.charts) {
    const chartsPath = path.join(projectPath, 'src/components/charts');
    if (fs.existsSync(chartsPath)) {
      fs.rmSync(chartsPath, { recursive: true, force: true });
    }
  }

  // Remove Sentry config if monitoring not selected
  if (!selectedPackages.monitoring) {
    ['sentry.edge.config.ts', 'sentry.server.config.ts', 'src/instrumentation.ts', 'src/instrumentation-client.ts'].forEach(file => {
      const filePath = path.join(projectPath, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  // Remove file handling components if not selected
  if (!selectedPackages.fileHandling) {
    const filesToRemove = [
      'src/components/base/file-dropzone.tsx',
      'src/components/base/document-viewer.tsx',
      'src/components/base/document-display-button.tsx'
    ];
    filesToRemove.forEach(file => {
      const filePath = path.join(projectPath, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }
}

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

// Run the main function
main().catch(error => {
  console.error('❌ Error creating project:', error);
  rl.close();
  process.exit(1);
});