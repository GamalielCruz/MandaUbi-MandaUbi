/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'blogger.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
      ],
    },
    // Use standalone output for deployment
    output: 'standalone',
  };
  
  module.exports = nextConfig;
  