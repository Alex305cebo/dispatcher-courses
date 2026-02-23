# Dispatcher Cards - Полный код проекта (Часть 3)

## src/app/layout.tsx

```typescript
'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <title>Dispatcher Cards - Интерактивное обучение</title>
        <meta name="description" content="Образовательное приложение для диспетчеров" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }
  
  html {
    @apply antialiased;
  }
  
  body {
    @apply transition-colors duration-300;
    touch-action: pan-y;
    overscroll-behavior: none;
  }
}
```
