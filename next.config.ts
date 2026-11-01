import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'phenixrhydermusic.com' }], destination: 'https://phenixrhyder.com/:path*', permanent: true }, { source: '/:path*', has: [{ type: 'host', value: 'www.phenixrhydermusic.com' }], destination: 'https://phenixrhyder.com/:path*', permanent: true }];
  },
};
export default config;
