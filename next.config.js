/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd', '@ant-design/icons'],
  images: {
    domains: ['fakestoreapi.com'],
  },
}

module.exports = nextConfig
