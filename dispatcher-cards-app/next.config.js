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
}

module.exports = nextConfig
