/** @type {import('next').NextConfig} */
const nextConfig = {
  // Для Node.js деплоя на Hostinger (НЕ статический экспорт)
  // output: 'export', // Отключено для Node.js деплоя
  
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
