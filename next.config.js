/** @type {import('next').NextConfig} */

const DFXWebPackConfig = require('./dfx.webpack.config');
DFXWebPackConfig.initCanisterIds();

const webpack = require('webpack');

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: 'local',
  BASE_URL: 'https://icp-node.ammag.tech/v1/',
  ASSETS_ID: 'bd3sg-teaaa-aaaaa-qaaba-cai',
  NEXT_PUBLIC_GOOGLE_MAP_API:"AIzaSyDk-rwnNyAFaJRMaqZtGWnt3GQKTiQ2joU",
  MASTER_WALLET:
    's25sy-rsnmo-ud3bs-gepqx-rfa7b-hnnp4-s5d27-zwtr7-uovzz-qgloj-wae',
});

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    );
    // Plugin
    config.plugins.push(EnvPlugin);

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  output: 'export',
};

module.exports = nextConfig;
