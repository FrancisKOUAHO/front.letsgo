/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['fr', 'en-US'],
    defaultLocale: 'fr',
  },
};

module.exports = nextConfig;
