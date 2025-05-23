/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    // GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
