# Next.js App Template

A modern, production-ready Next.js 15 template with TypeScript, Tailwind CSS, and a comprehensive set of tools and components.

## Features

- ⚡ **Next.js 15** with App Router and Turbo
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🧩 **Modular Components** - Organized component library
- 🔐 **Authentication Ready** - Auth components and layouts
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Theme switching support
- 📊 **Charts Integration** - Chart.js support
- 🔄 **State Management** - Zustand integration
- 🛠 **Development Tools** - ESLint, Prettier, TypeScript
- 🐳 **Docker Ready** - Production-ready Dockerfile
- 🚀 **Optimized Build** - Performance optimizations

## Quick Start

### Using npx (Recommended)

```bash
npx create-webbx-app my-app
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

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages
│   ├── (private)/         # Protected routes
│   ├── (public)/          # Public pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── base/              # Base UI components
│   ├── elements/          # Composed elements
│   ├── forms/             # Form components
│   ├── landing-sections/  # Landing page sections
│   ├── modals/            # Modal components
│   ├── tables/            # Table components
│   └── ui/                # Core UI components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript checks

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

## Customization

1. **Update branding**: Replace placeholders in components and content
2. **Modify theme**: Edit `tailwind.config.js` and global styles
3. **Add features**: Extend the modular component structure
4. **Configure API**: Update API routes in `src/app/api/`

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + Radix UI + HeroUI
- **Icons**: Heroicons + Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form ready
- **Animation**: Framer Motion
- **Charts**: Chart.js + React Chart.js 2
- **Development**: ESLint + Prettier + TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this template helpful, please consider giving it a ⭐ on GitHub!