#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Enable keypress events
readline.emitKeypressEvents(process.stdin);

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

const createInteractiveMenu = (title, options, defaultIndex = 0) => {
  return new Promise((resolve) => {
    let selectedIndex = defaultIndex;
    
    const displayMenu = () => {
      // Clear screen and move cursor to top
      console.clear();
      console.log('\n🚀 Welcome to Next.js App Template Generator!\n');
      console.log(`Creating a new Next.js app: ${projectName}\n`);
      
      console.log(title);
      options.forEach((option, index) => {
        const prefix = index === selectedIndex ? '❯' : ' ';
        const style = index === selectedIndex ? '\x1b[36m\x1b[1m' : '\x1b[0m'; // Cyan and bold for selected
        const reset = '\x1b[0m';
        console.log(`${prefix} ${style}${option}${reset}`);
      });
      console.log('\n↑↓ Navigate • Enter to select');
    };

    const handleKeypress = (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit(0);
      }

      switch (key.name) {
        case 'up':
          selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : options.length - 1;
          displayMenu();
          break;
        case 'down':
          selectedIndex = selectedIndex < options.length - 1 ? selectedIndex + 1 : 0;
          displayMenu();
          break;
        case 'return':
          process.stdin.removeListener('keypress', handleKeypress);
          process.stdin.setRawMode(false);
          process.stdin.resume();
          resolve(selectedIndex);
          break;
      }
    };

    // Enable raw mode and keypress events
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('keypress', handleKeypress);

    // Display initial menu
    displayMenu();
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
  // Lucide React icons included by default - no selection needed
  icons: {
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
  ui: {
    v3: {
      '@heroui/react': '^2.7.0'
    },
    v4: {
      '@heroui/react': '^2.8.2'
    }
  },
  fileHandling: {
    'react-dropzone': '^14.3.8'
  },
  devTools: {
    '@tanstack/react-query-devtools': '^5.85.2'
  }
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
    const pmOptions = [
      'bun (fastest)',
      'yarn (stable)', 
      'npm (default)'
    ];
    
    const selectedPMIndex = await createInteractiveMenu('📦 Choose your package manager:', pmOptions, 0);
    const pmMappings = ['bun', 'yarn', 'npm'];
    packageManager = pmMappings[selectedPMIndex];
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
  const tailwindOptions = [
    'Tailwind CSS v3 (stable, widely supported)',
    'Tailwind CSS v4 (recommended, modern features)'
  ];
  
  const selectedTailwindIndex = await createInteractiveMenu('🎨 Choose Tailwind CSS version:', tailwindOptions, 1);
  
  const version = selectedTailwindIndex === 1 ? 'v4' : 'v3';
  const versionName = selectedTailwindIndex === 1 ? 'Tailwind CSS v4 (recommended)' : 'Tailwind CSS v3 (stable)';
  
  console.clear();
  console.log('\n🚀 Welcome to Next.js App Template Generator!\n');
  console.log(`Creating a new Next.js app: ${projectName}\n`);
  console.log(`✅ Selected ${versionName}\n`);
  
  return version;
}

async function selectPackages() {
  console.log('🎯 Choose which packages to include in your project:\n');
  console.log('📦 ICONS: Lucide React (included by default)\n');
  
  const selections = {};
  
  // Icons - always included by default
  selections.icons = true;
  
  // State Management
  console.log('🔄 STATE MANAGEMENT:');
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
  
  // UI Components
  console.log('\n🎨 UI COMPONENTS:');
  const useUILibs = await question('  Include UI libraries? (HeroUI) [y/N]: ');
  selections.ui = useUILibs.toLowerCase() === 'y';
  
  // File Handling
  console.log('\n📁 FILE HANDLING:');
  const useFileHandling = await question('  Include file handling? (React Dropzone) [y/N]: ');
  selections.fileHandling = useFileHandling.toLowerCase() === 'y';
  
  return selections;
}

const createMultiSelectMenu = (title, options) => {
  return new Promise((resolve) => {
    let selectedIndex = 0;
    let selectedItems = new Set();
    
    const displayMenu = () => {
      console.clear();
      console.log('\n🚀 Welcome to Next.js App Template Generator!\n');
      console.log(`Creating a new Next.js app: ${projectName}\n`);
      
      console.log(title);
      console.log('(Use ↑↓ to navigate, Space to toggle, Enter to confirm)\n');
      
      options.forEach((option, index) => {
        const prefix = index === selectedIndex ? '❯' : ' ';
        const checkbox = selectedItems.has(index) ? '☑' : '☐';
        const style = index === selectedIndex ? '\x1b[36m\x1b[1m' : '\x1b[0m';
        const reset = '\x1b[0m';
        console.log(`${prefix} ${checkbox} ${style}${option}${reset}`);
      });
      
      console.log(`\n${selectedItems.size} selected • ↑↓ Navigate • Space Toggle • Enter Confirm`);
    };

    const handleKeypress = (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit(0);
      }

      switch (key.name) {
        case 'up':
          selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : options.length - 1;
          displayMenu();
          break;
        case 'down':
          selectedIndex = selectedIndex < options.length - 1 ? selectedIndex + 1 : 0;
          displayMenu();
          break;
        case 'space':
          if (selectedItems.has(selectedIndex)) {
            selectedItems.delete(selectedIndex);
          } else {
            selectedItems.add(selectedIndex);
          }
          displayMenu();
          break;
        case 'return':
          process.stdin.removeListener('keypress', handleKeypress);
          process.stdin.setRawMode(false);
          process.stdin.resume();
          resolve(Array.from(selectedItems));
          break;
      }
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('keypress', handleKeypress);

    displayMenu();
  });
};


async function setupProject(projectPath, selectedPackages, packageManager, tailwindVersion) {
  console.log('🧹 Cleaning up template files...');
  
  // Clean up template-specific files
  const filesToRemove = [
    'bin',
    '.git',
    'node_modules',
    '.next',
    '.env.local',
    'package-v3.json',
    'package-v4.json',
    'src/app/globals-v3.css',
    'tailwind.config.ts', // Remove this as we'll create it conditionally
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
  // Copy the tailwind.config.ts file from template
  const sourceConfigPath = path.join(__dirname, '..', 'tailwind.config.ts');
  const destConfigPath = path.join(projectPath, 'tailwind.config.ts');
  
  if (fs.existsSync(sourceConfigPath)) {
    fs.copyFileSync(sourceConfigPath, destConfigPath);
  } else {
    // Fallback: create the config inline
    const tailwindConfig = `import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  darkMode: ['class'],
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#000000',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#ffffff',
              foreground: '#000000',
            },
            default: {
              DEFAULT: '#f5f5f5',
              foreground: '#000000',
            },
            background: '#ffffff',
            foreground: '#000000',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#ffffff',
              foreground: '#000000',
            },
            secondary: {
              DEFAULT: '#000000',
              foreground: '#ffffff',
            },
            default: {
              DEFAULT: '#1a1a1a',
              foreground: '#ffffff',
            },
            background: '#000000',
            foreground: '#ffffff',
          },
        },
      },
    }),
  ],
};

export default config;`;
    
    fs.writeFileSync(destConfigPath, tailwindConfig);
  }

  // Replace globals.css with v3 version
  const sourceGlobalsPath = path.join(__dirname, '..', 'src', 'app', 'globals-v3.css');
  const destGlobalsPath = path.join(projectPath, 'src', 'app', 'globals.css');
  
  if (fs.existsSync(sourceGlobalsPath)) {
    fs.copyFileSync(sourceGlobalsPath, destGlobalsPath);
  }

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
  // Create HeroUI plugin configuration file
  const heroConfigContent = `import { heroui } from "@heroui/react";

export default heroui({
  addCommonColors: true,
  themes: {
    light: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        default: {
          DEFAULT: '#f5f5f5',
          foreground: '#000000',
        },
        background: '#ffffff',
        foreground: '#000000',
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#000000',
          foreground: '#ffffff',
        },
        default: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
        background: '#000000',
        foreground: '#ffffff',
      },
    },
  },
});`;

  fs.writeFileSync(path.join(projectPath, 'hero.ts'), heroConfigContent);

  // Tailwind v4 uses CSS-based configuration
  const globalsPath = path.join(projectPath, 'src', 'app', 'globals.css');
  let globalsContent = fs.readFileSync(globalsPath, 'utf8');
  
  // Replace existing Tailwind imports with v4 syntax
  globalsContent = globalsContent.replace(
    /@tailwind base;[\r\n]+@tailwind components;[\r\n]+@tailwind utilities;/g,
    `@import "tailwindcss";
@plugin '../../hero.ts';
@source '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
@custom-variant dark (&:is(.dark *));`
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
  
  // Add Tailwind v4 plugin to next.config.ts if not already present
  if (!nextConfig.includes('@tailwindcss/vite')) {
    // Add the import at the top
    if (nextConfig.includes('import { NextConfig, SizeLimit }')) {
      nextConfig = nextConfig.replace(
        'import { NextConfig, SizeLimit } from \'next\';',
        `import { NextConfig, SizeLimit } from 'next';
import tailwindcss from '@tailwindcss/vite';`
      );
    } else if (nextConfig.includes('import type { NextConfig }')) {
      nextConfig = nextConfig.replace(
        'import type { NextConfig } from "next";',
        `import type { NextConfig } from "next";
import tailwindcss from '@tailwindcss/vite';`
      );
    } else {
      // Fallback: add import after the first line
      const lines = nextConfig.split('\n');
      lines.splice(1, 0, 'import tailwindcss from \'@tailwindcss/vite\';');
      nextConfig = lines.join('\n');
    }

    // Add Tailwind CSS plugin to webpack config
    // Look for existing webpack function and modify it
    if (nextConfig.includes('webpack: (config, { dev, isServer }) => {')) {
      // Add tailwindcss plugin after the existing webpack config starts
      nextConfig = nextConfig.replace(
        'webpack: (config, { dev, isServer }) => {',
        `webpack: (config, { dev, isServer }) => {
    // Add Tailwind CSS v4 plugin
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());`
      );
    } else {
      // Add a new webpack section before the closing bracket
      nextConfig = nextConfig.replace(
        'export default nextConfig;',
        `  webpack: (config) => {
    // Add Tailwind CSS v4 plugin
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default nextConfig;`
      );
    }

    fs.writeFileSync(nextConfigPath, nextConfig);
  }

  // Create PostCSS configuration for Tailwind v4
  const postcssConfig = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`;

  fs.writeFileSync(path.join(projectPath, 'postcss.config.mjs'), postcssConfig);
}



function cleanupUnusedFiles(projectPath, selectedPackages) {
  // Charts and Sentry are no longer included in the template, so no cleanup needed

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