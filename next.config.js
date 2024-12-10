/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  async headers() {
    return [
      {
        source: '/app/:slug*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://app.intersend.io/;",
          },
        ],
      },
    ];
  },
  // Add this if you need to handle images from external domains
  images: {
    domains: ['app.intersend.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.intersend.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;