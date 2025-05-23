import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';  // Enables local Worker emulation :contentReference[oaicite:5]{index=5}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // You can add any other Next.js settings here
  experimental: {
    serverActions: true,
  },
};

if (process.env.NODE_ENV === 'development') {
  // Hook into `next dev` to emulate Cloudflare Workers locally
  await setupDevPlatform();                                             // Required for full-stack SSR on Pages :contentReference[oaicite:6]{index=6}
}

export default nextConfig;