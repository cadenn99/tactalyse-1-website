/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/backend/auth/login",
        destination: "http://localhost:5000/auth/login",
      },
      {
        source: "/backend/checkout/noPayment",
        destination: "http://localhost:5000/checkout/noPayment"
      },
      {
        source: "/backend/checkout/completeOrder",
        destination: "http://localhost:5000/checkout/completeOrder"
      }
    ];
  },
};

// TODO: replace the above with ENV variables

module.exports = nextConfig
