/** @type {import('next').NextConfig} */

/**
 * This configures a few proxy routes we use to make calls to the backend.
 * We use this over NextJS's inbuilt api functionality because doing so would amount to basically writing a separate backend for no reason.
 */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/backend/auth/login",
        destination: "http://localhost:5000/auth/login",
      },
      {
        source: "/backend/auth/register",
        destination: "http://localhost:5000/auth/register",
      },
      {
        source: "/backend/checkout/noPayment",
        destination: "http://localhost:5000/checkout/noPayment"
      },
      {
        source: "/backend/checkout/pay",
        destination: "http://localhost:5000/checkout/pay"
      }
    ];
  },
};

// TODO: replace the above with ENV variables

module.exports = nextConfig
