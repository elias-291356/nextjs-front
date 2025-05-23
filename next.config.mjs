/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    GOOGLE_RECAPTCHA_SECRET_KEY_CLIENT: process.env.GOOGLE_RECAPTCHA_SECRET_KEY_CLIENT
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
