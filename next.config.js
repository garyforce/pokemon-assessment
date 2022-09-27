const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const pkg = require('./package.json');

module.exports = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    nextConfig.publicRuntimeConfig = {
      pkg: {
        version: `${pkg.version}-dev`,
      },
    };
  }

  return nextConfig;
};
