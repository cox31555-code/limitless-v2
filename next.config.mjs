/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POST_CODE_ApiKey: process.env.POST_CODE_ApiKey,
    NEXT_PUBLIC_API_URL: "https://api.limitlesscover.co.uk",
    // NEXT_PUBLIC_API_URL: "http://localhost:8000",
  },
  // Compile all pages upfront
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60 * 24, // 24 hours
    pagesBufferLength: Infinity, // Keep all compiled pages in memory
  },
  // Optimize preloading to reduce warnings
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  // Auto-remove console.logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Allow external images from builder.io
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.builder.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sectigo.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
