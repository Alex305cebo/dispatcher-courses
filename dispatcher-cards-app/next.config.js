/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт для Hostinger
  output: 'export',
  
  images: {
    unoptimized: true
  },
  
  reactStrictMode: true,
  
  // Отключаем ESLint и TypeScript проверки во время сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
