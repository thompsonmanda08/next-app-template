/**
 * 🚀 ROOT LAYOUT - SEO & METADATA CONFIGURATION
 * 
 * This file contains all SEO and metadata settings for your Next.js application.
 * 
 * 📝 TO CUSTOMIZE FOR YOUR APP:
 * 
 * 1. 🎨 APP CONFIGURATION (Lines ~70-75):
 *    - Update app name, description, URL, and social media handles
 *    - Add your domain and social media images
 * 
 * 2. 🔍 SEO KEYWORDS (Lines ~100-110):
 *    - Replace generic keywords with industry-specific terms
 *    - Add your app's main features and target keywords
 * 
 * 3. 📱 SOCIAL MEDIA (Lines ~125-155):
 *    - Update Open Graph and Twitter card titles/descriptions
 *    - Add your social media image URLs (1200x630 pixels)
 * 
 * 4. 🎯 ICONS & FAVICONS (Lines ~160-175):
 *    - Add your favicon files to the /public directory
 *    - Update icon file paths and sizes
 * 
 * 5. 🔐 SEARCH CONSOLE (Lines ~210-215):
 *    - Add your Google Search Console verification code
 *    - Add other webmaster tool verification codes
 * 
 * 6. 📋 STRUCTURED DATA (Lines ~235-285):
 *    - Update company information and contact details
 *    - Add your app's features and pricing information
 *    - Update social media profiles
 * 
 * 7. ⚡ PERFORMANCE (Lines ~320-330):
 *    - Add preconnect links for external services you use
 *    - Add DNS prefetch for better loading speed
 * 
 * 💡 SEO BEST PRACTICES:
 * - Keep titles under 60 characters
 * - Keep descriptions between 150-160 characters
 * - Use high-quality images (1200x630 for social media)
 * - Test with tools like Google Rich Results Test
 */

import { Metadata, Viewport } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import Providers from './providers';
import { verifySession } from '@/lib/session';

const inter = localFont({
  src: [
    {
      path: 'fonts/inter/100.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/inter/200.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'fonts/inter/300.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/inter/400.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/inter/500.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/inter/600.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/inter/700.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/inter/800.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/inter/900.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['inter', 'system-ui', 'arial'],
});

// 🎨 CUSTOMIZE: Update these values for your application
const description =
  'A modern Next.js application built with TypeScript, Tailwind CSS, and cutting-edge web technologies';

export const appConfig = {
  name: 'Your App Name', // 📝 Replace with your application name
  description,
  url: 'https://yourapp.com', // 🌐 Replace with your domain
  ogImage: 'https://yourapp.com/og-image.png', // 🖼️ Replace with your Open Graph image (1200x630)
  twitterImage: 'https://yourapp.com/twitter-image.png', // 🐦 Replace with your Twitter card image
  creator: '@yourusername', // 📱 Replace with your Twitter handle
};

// Separate viewport export (Next.js 15+ requirement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
};

// 🚀 SEO OPTIMIZATION: Customize metadata for better search engine visibility
export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    template: '%s | Your App Name', // 📝 Customize the title template
    default: 'Your App Name - Modern Web Application', // 🏷️ Update the default title
  },
  description, // 📄 Description defined above - update for your app
  keywords: [
    // 🔍 CUSTOMIZE: Add relevant keywords for your application
    'nextjs',
    'typescript',
    'tailwind css',
    'web application',
    'modern ui',
    'responsive design',
    'your industry keywords', // Replace with industry-specific terms
    'your product features', // Replace with your app's features
  ],
  authors: [{ name: 'Your Name', url: appConfig.url }], // 👤 Update author info
  creator: 'Your Name', // 👨‍💻 Your name or company
  publisher: 'Your Company', // 🏢 Your company name
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // 📱 SOCIAL MEDIA: Open Graph tags for better social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US', // 🌍 Update locale if targeting different regions
    url: appConfig.url,
    title: 'Your App Name - Modern Web Application', // 📝 Update Open Graph title
    description, // Uses description from above
    siteName: appConfig.name,
    images: [
      {
        url: appConfig.ogImage, // 🖼️ Must be 1200x630 pixels for optimal display
        width: 1200,
        height: 630,
        alt: 'Your App Name - Application Screenshot', // 🏷️ Update alt text
        type: 'image/png', // 📷 Update image type if different
      },
    ],
  },

  // 🐦 TWITTER: Twitter Card configuration
  twitter: {
    card: 'summary_large_image', // 📏 Uses large image format
    title: 'Your App Name - Modern Web Application', // 📝 Update Twitter title
    description, // Uses description from above
    site: appConfig.creator, // 🔗 Your Twitter handle
    creator: appConfig.creator, // 👤 Content creator Twitter handle
    images: [
      {
        url: appConfig.twitterImage, // 🖼️ Twitter image (same size as OG)
        width: 1200,
        height: 630,
        alt: 'Your App Name Application', // 🏷️ Update alt text
      },
    ],
  },

  // 🎯 ICONS: App icons for different platforms and sizes
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png', // 📁 Add your 16x16 favicon
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png', // 📁 Add your 32x32 favicon
        sizes: '32x32', 
        type: 'image/png',
      },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }], // 🍎 Apple touch icon
    shortcut: '/favicon.ico', // 🔗 Traditional favicon
  },

  // 📱 PWA: Progressive Web App manifest
  manifest: '/site.webmanifest', // 📄 Update manifest file name if different

  // 📱 MOBILE: App-specific configurations
  applicationName: appConfig.name,
  appleWebApp: {
    capable: true, // 📱 Enable standalone mode on iOS
    statusBarStyle: 'default', // 🎨 Status bar appearance: 'default' | 'black' | 'black-translucent'
    title: appConfig.name, // 📝 App title when added to home screen
    startupImage: [
      {
        url: '/apple-splash-screen.png', // 🖼️ Add your iOS splash screen image
        media: '(max-width: 768px)',
      },
    ],
  },

  // 🤖 SEO: Search engine crawling instructions
  robots: {
    index: true, // ✅ Allow search engines to index your site
    follow: true, // ✅ Allow crawlers to follow links
    nocache: false, // 💾 Allow caching
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false, // ✅ Allow Google to index images
      'max-video-preview': -1, // 📹 No limit on video preview length
      'max-image-preview': 'large', // 🖼️ Allow large image previews
      'max-snippet': -1, // 📝 No limit on text snippet length
    },
  },

  // 🔐 VERIFICATION: Search console and webmaster tools
  verification: {
    google: 'your-google-search-console-code', // 🔍 Add Google Search Console verification
    yandex: 'your-yandex-webmaster-code', // 🌐 Add Yandex verification (optional)
    other: {
      'facebook-domain-verification': 'your-facebook-verification-code', // 📘 Facebook domain verification
      // 'msvalidate.01': 'your-bing-verification-code', // 🔍 Bing webmaster tools
    },
  },

  // 🔗 CANONICAL: Prevent duplicate content issues
  alternates: {
    canonical: appConfig.url, // 📍 Primary URL for this page
    languages: {
      'en-US': appConfig.url, // 🇺🇸 English (US) version
      // Add more language versions as needed:
      // 'es-ES': `${appConfig.url}/es`,
      // 'fr-FR': `${appConfig.url}/fr`,
    },
  },

  // 📊 CATEGORIZATION: Help search engines understand your content
  category: 'technology', // 🏷️ Update with your app's category
  classification: 'Business', // 🏢 Content classification
  referrer: 'origin-when-cross-origin', // 🔒 Privacy setting for referrer headers
};

// 📋 STRUCTURED DATA: Rich snippets for better search results
// 🎯 CUSTOMIZE: Update this JSON-LD schema for your application
export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication', // 💻 Application type - can be 'Website', 'SoftwareApplication', etc.
    name: appConfig.name,
    url: appConfig.url,
    logo: `${appConfig.url}/logo.png`, // 🖼️ Add your logo image
    description,
    operatingSystem: 'Web Browser', // 🌐 Platform compatibility
    applicationCategory: 'BusinessApplication', // 🏢 Update category: 'BusinessApplication', 'LifestyleApplication', etc.
    browserRequirements: 'Requires JavaScript. Requires HTML5.', // ⚙️ Technical requirements
    permissions: 'No special permissions required', // 🔐 Privacy information
    offers: {
      // 💰 PRICING: Update if your app has pricing
      '@type': 'Offer',
      price: '0', // 💵 Set your price or '0' for free
      priceCurrency: 'USD', // 💱 Currency code
      description: 'Free modern web application', // 📝 Pricing description
    },
    creator: {
      // 👤 CREATOR: Update with your information
      '@type': 'Organization', // Can be 'Person' or 'Organization'
      name: 'Your Company Name', // 🏢 Your company or name
      url: 'https://yourcompany.com', // 🌐 Your company website
      logo: `${appConfig.url}/company-logo.png`, // 🖼️ Company logo
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567', // 📞 Support phone (optional)
        email: 'support@yourapp.com', // 📧 Support email
        contactType: 'Customer Service', // 🎧 Contact type
        availableLanguage: ['English'], // 🌍 Supported languages
      },
    },
    sameAs: [
      // 🔗 SOCIAL LINKS: Add your social media profiles
      'https://twitter.com/yourusername',
      'https://www.linkedin.com/company/yourcompany',
      'https://www.facebook.com/yourcompany',
      // 'https://github.com/yourusername',
      // 'https://instagram.com/yourusername',
    ],
    featureList: [
      // ✨ FEATURES: List your app's key features
      'Modern UI Design',
      'Responsive Layout',
      'TypeScript Support',
      'Dark Mode Support',
      'Fast Performance',
      // Add your specific features here
    ],
    screenshot: `${appConfig.url}/app-screenshot.png`, // 📸 App screenshot for rich snippets
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await verifySession();

  const structuredData = generateStructuredData();

  return (
    <html
      lang="en"
      className={cn('h-screen scroll-smooth bg-background antialiased light')}
      suppressHydrationWarning
    >
    <head>
      <meta name="apple-mobile-web-app-title" content="WebbX" />
    </head>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-inter overflow-x-hidden',
          inter.variable,
          inter.className,
        )}
        suppressHydrationWarning
      >
        {/* 📊 STRUCTURED DATA: JSON-LD for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* ⚡ PERFORMANCE: Preconnect to external domains */}
        {/* 🔗 CUSTOMIZE: Add preconnect links for external services you use */}
        {/* 
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.yourservice.com" />
        */}

        {/* 🚀 DNS PREFETCH: Improve loading speed for external resources */}
        {/* 🔗 CUSTOMIZE: Add DNS prefetch for services you use */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        {/* 
        <link rel="dns-prefetch" href="//api.yourdomain.com" />
        <link rel="dns-prefetch" href="//cdn.yourservice.com" />
        */}

        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
