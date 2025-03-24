/**
 * @type {import('next').NextConfig}
 */
const output = process.env.NODE_ENV === 'production' ? 'export' : 'standalone';
const nextConfig = {
  trailingSlash: true,
  distDir: 'build',
  output,
  basePath: '',
  swcMinify: false,
  devIndicators: {
    buildActivityPosition: 'bottom-left',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/web_pages/home',
      },

      {
        source: '/products',
        destination: '/web_pages/products',
      },

      {
        source: '/contact',
        destination: '/web_pages/contact',
      },

      {
        source: '/faq',
        destination: '/web_pages/faq',
      },

      {
        source: '/testimonials',
        destination: '/web_pages/testimonials',
      },
    ];
  },
};

export default nextConfig;
