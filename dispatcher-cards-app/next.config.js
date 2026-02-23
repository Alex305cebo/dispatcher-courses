/** @type {import('next').NextConfig} */
const nextConfig = {
  // Раскомментируйте для статического экспорта (если нет Node.js на сервере)
  // output: 'export',
  // images: {
  //   unoptimized: true
  // },
  
  // Для деплоя в подпапку (например, /cards)
  // basePath: '/cards',
  
  reactStrictMode: true,
  
  // Отключаем ESLint и TypeScript проверки во время сборки (для Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
