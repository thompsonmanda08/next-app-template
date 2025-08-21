# Create WebbX App

A modern, production-ready Next.js 15 template with TypeScript, Tailwind CSS, and an interactive setup experience.

## ✨ Features

- ⚡ **Next.js 15** with App Router and Turbo
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS v3/v4** - Choose your preferred version during setup
- 🧩 **HeroUI Integration** - Modern UI components with full Tailwind v4 support
- 📦 **Smart Package Manager** - Auto-detects Bun/Yarn/npm
- 🔐 **Authentication Ready** - Pre-built auth forms and layouts
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Built-in theme switching
- 🔄 **Optional Integrations** - Choose what you need:
  - Zustand (State Management)
  - TanStack Query (Data Fetching) 
  - Framer Motion (Animations)
  - React Dropzone (File Handling)
  - HeroUI (UI Components)
- 🛠 **Development Tools** - ESLint, Prettier, TypeScript
- 🐳 **Docker Ready** - Production-ready Dockerfile
- 🚀 **Interactive Setup** - Choose only what you need

## 🚀 Quick Start

### Using npx (Recommended)

```bash
# For stable release (coming soon)
npx create-webbx-app@latest my-app

# For current development version
npx create-webbx-app@alpha my-app

cd my-app
npm run dev
```

### Manual Installation

```bash
git clone https://github.com/thompsonmanda08/next-app-template.git my-app
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your application.

## 🎛 Interactive Setup

The template includes an interactive setup process that lets you choose:

### Package Manager
- **Bun** (fastest)
- **Yarn** (stable) 
- **npm** (default)

### Tailwind CSS Version
- **v3** (stable, widely supported)
- **v4** (beta, modern features)

### Optional Packages
- **Zustand** - State management
- **TanStack Query** - Data fetching & caching
- **Framer Motion** - Animations
- **HeroUI** - Modern React component library
- **React Dropzone** - File handling
- **ShadCN UI** - Optional component library (choose during setup)

### UI Components
- **HeroUI** (default) - Modern components with excellent Tailwind integration
- **ShadCN UI** (optional) - Customizable components for Tailwind v3

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages (login, register, etc.)
│   ├── (private)/         # Protected routes (dashboard, etc.)
│   ├── (public)/          # Public pages (support, legal, etc.)
│   ├── _actions/          # Server actions
│   ├── api/               # API routes
│   ├── fonts/             # Font files (Inter variable)
│   └── globals.css        # Global styles & Tailwind imports
├── components/            # React components
│   ├── base/              # Base reusable components
│   ├── elements/          # Composed UI elements
│   ├── forms/             # Form components (login, register, etc.)
│   └── ui/                # Core UI components (buttons, inputs, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries (utils, constants, etc.)
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware
```

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production  
- `npm run build:clean` - Clean build (removes .next)
- `npm run build:production` - Production build with NODE_ENV
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript checks
- `npm run type-check:watch` - Run TypeScript checks in watch mode

## Docker Support

### Development

```bash
docker build -t my-app .
docker run -p 3000:3000 --name my-app my-app
```

### Production

```bash
docker build --build-arg VERSION=1.0.0 -t my-app:1.0.0 .
docker run -p 3000:3000 my-app:1.0.0
```

## 🎨 Customization

### Branding & Content
1. **Logo**: Replace logo in `src/components/base/logo.tsx`
2. **Colors**: Edit CSS variables in `src/app/globals.css` or `hero.ts` config
3. **Typography**: Modify font imports in `src/app/layout.tsx`
4. **Content**: Update placeholder text in components and pages

### Theme Configuration
- **HeroUI Themes**: Edit `hero.ts` for comprehensive theme customization
- **Tailwind v3**: Edit `tailwind.config.ts` (if using v3)
- **Tailwind v4**: Modify CSS variables in `src/app/globals.css` (default)
- **Dark mode**: Colors automatically adjust via CSS variables and HeroUI themes

### Adding Features
1. **New pages**: Add to appropriate route groups in `src/app/`
2. **Components**: Follow the existing structure in `src/components/`
3. **API routes**: Add endpoints in `src/app/api/`
4. **Hooks**: Create custom hooks in `src/hooks/`

## 🛠 Tech Stack

### Core
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3/v4 (your choice)
- **Package Manager**: Bun/Yarn/npm (auto-detected)

### Default Integrations
- **UI Components**: HeroUI (included by default)

### Optional Integrations (Choose during setup)
- **ShadCN UI**: Alternative component library
- **Icons**: Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Animation**: Framer Motion  
- **File Handling**: React Dropzone
- **Theming**: next-themes for dark/light mode

### Development Tools
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Build**: Next.js optimized builds
- **Containerization**: Docker support

## 📦 Version Information

- **Current Release**: `1.6.0` (stable, HeroUI as default UI library)
- **Previous**: `1.5.1` (ShadCN as default)
- **Coming Soon**: `2.0.0` (major release with enhanced features)

### Using Different Versions
```bash
# Latest alpha (recommended for testing)
npx create-webbx-app@alpha my-app

# Future beta version  
npx create-webbx-app@beta my-app

# Future stable version
npx create-webbx-app@latest my-app
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/thompsonmanda08/next-app-template.git
cd next-app-template
npm install
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💫 Support

If you find this template helpful, please consider:
- ⭐ **Star** the repository on GitHub
- 🐛 **Report issues** you encounter
- 💡 **Suggest features** you'd like to see
- 🤝 **Contribute** improvements

---

**Made with ❤️ by [Thompson Manda](https://github.com/thompsonmanda08)**