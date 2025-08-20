import { NextConfig, SizeLimit } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix: process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL,
  compress: false, // Disable compression - let reverse proxy handle it
  outputFileTracingRoot: process.cwd(), // Container-specific settings

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: String(
          process.env.SERVER_URL ||
            process.env.NEXT_PUBLIC_SERVER_URL ||
            'http://localhost:3000',
        ),
        port: '',
        pathname: '/**',
      },
      // Add your custom domains here
      // {
      //   protocol: 'https',
      //   hostname: 'yourdomain.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  experimental: {
    // Disable SWC transforms that might force HTTPS
    forceSwcTransforms: false, //Disabled
    serverActions: {
      bodySizeLimit: (process.env.MAX_FILE_SIZE_LIMIT as SizeLimit) || '10mb',
      allowedOrigins: ['localhost', '*.localhost'],
    },

    optimizePackageImports: ['lucide-react'], // Optimize chunk splitting
  },

  // Disable webpack cache if causing issues
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }

    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 500000, // Increase max size to reduce chunk count
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },

  // Ensure static files use HTTP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests; block-all-mixed-content',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Encoding',
            value: 'identity', // Disable chunked encoding for static files
          },
        ],
      },
      {
        source: '/_next/static/media/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'font/ttf',
          },
          // Force proper content encoding
          {
            key: 'Content-Encoding',
            value: 'identity',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
