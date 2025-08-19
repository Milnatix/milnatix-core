import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

const withPWA = require('next-pwa')({
  dest: 'public'
})


export default withPWA(nextConfig);
