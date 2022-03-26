const withPlugins = require('next-compose-plugins');
const { withSuperjson } = require('next-superjson');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const optimizedImages = require('next-optimized-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins(
  [
    withSuperjson(),
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    [optimizedImages, {}],
  ],
  nextConfig
);
