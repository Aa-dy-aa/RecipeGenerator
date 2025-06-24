/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['loremflickr.com'],
  },
  
  experimental: {
    serverActions: true, 
  },
  output: 'standalone', 
};
export default nextConfig;
