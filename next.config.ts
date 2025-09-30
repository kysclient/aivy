import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'aivy.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
