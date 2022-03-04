/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const { withSuperjson } = require('next-superjson');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withSuperjson()(withBundleAnalyzer(nextConfig));
