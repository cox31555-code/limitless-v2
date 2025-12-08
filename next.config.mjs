/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POST_CODE_ApiKey: process.env.POST_CODE_ApiKey,
    NEXT_PUBLIC_API_URL: "https://api.limitlesscover.co.uk",
    // NEXT_PUBLIC_API_URL: "http://localhost:8000",
  },
  // Allow HMR from Builder.io preview domains
  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
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
