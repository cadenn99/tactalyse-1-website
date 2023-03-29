/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/auth/login",
        destination: "http://localhost:5000/auth/login",
      },
    ];
  },
};

module.exports = nextConfig
