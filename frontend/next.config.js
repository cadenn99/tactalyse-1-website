/** @type {import('next').NextConfig} */

/**
 * This configures a few proxy routes we use to make calls to the backend.
 * We use this over NextJS's inbuilt api functionality because doing so would amount to basically writing a separate backend for no reason.
 */
const nextConfig = {
  reactStrictMode: true,
  env: {

  },
  async rewrites() {
    return [
      //     {
      //       source: "/backend/auth/register",
      //       destination: `${process.env.BACKEND_URL}/auth/register`
      //     },
      //     {
      //       source: "/backend/checkout/noPayment",
      //       destination: `${process.env.BACKEND_URL}/checkout/noPayment`
      //     },
      //     {
      //       source: "/backend/checkout/fullfillOrder",
      //       destination: `${process.env.BACKEND_URL}/checkout/fulfillOrder`
      //     },
      // {
      //   source: "/backend/checkout/pay",
      //   destination: `https://api.testalyse.nl/checkout/pay`
      // },
      // {
      //   source: "/backend/content/order-history",
      //   destination: `http://api.testalyse.nl/content/order-history"`
      // },
      // {
      //   source: "/backend/auth/register",
      //   destination: `http://api.testalyse.nl/auth/register`
      // }
    ];
  },
  images: {
    domains: ["www.tactalyse.com"]
  }
};

module.exports = nextConfig
