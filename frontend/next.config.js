/** @type {import('next').NextConfig} */

/**
 * This configures a few proxy routes we use to make calls to the backend.
 * We use this over NextJS's inbuilt api functionality because doing so would amount to basically writing a separate backend for no reason.
 */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
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
  //     {
  //       source: "/backend/checkout/pay",
  //       destination: `${process.env.BACKEND_URL}/checkout/pay`
  //     }
  //   ];
  // },
  images: {
    domains: ["www.tactalyse.com"]
  }
};

// TODO: the above rewrites are defined at build time; To fix this issue, we need to make some dynamic API routes that can work with env variables instead.

module.exports = nextConfig
