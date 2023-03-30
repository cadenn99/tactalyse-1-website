/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/backend/auth/login",
        destination: "http://localhost:5000/auth/login",
      },
    ];
  },
};

module.exports = nextConfig
