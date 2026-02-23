'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SwipeCardStack from '@/components/SwipeCardStack'
import ResultsModal from '@/components/ResultsModal'
import ThemeToggle from '@/components/ThemeToggle'
import { questions } from '@/data/questions'
import { createTranslator, defaultLocale } from '@/lib/i18n'

export default function Home() {
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ 
    correct: 0, 
    wrong: 0, 
    byCategory: {} as Record<string, { correct: number; total: number }> 
  })
  const [isRestarting, setIsRestarting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const t = createTranslator(defaultLocale)
  
  const currentQuestion = questions[currentIndex]
  const categoryIcon = currentQuestion?.category === 'Законодательство' ? '⚖️' :
                       currentQuestion?.category === 'Финансы' ? '💰' :
                       currentQuestion?.category === 'Переговоры' ? '🤝' :
                       currentQuestion?.category === 'Основы работы' ? '🚛' :
                       currentQuestion?.category === 'Безопасность' ? '🛡️' :
                       currentQuestion?.category === 'Документация' ? '📄' : '🎯'
  
  // Подсказка БЕЗ спойлеров - используем hint или первые 5 слов вопроса
  const getHeaderHint = () => {
    if (currentQuestion?.hint) {
      return currentQuestion.hint
    }
    // Если hint нет, берем первые 5 слов вопроса
    const words = currentQuestion?.question?.split(' ') || []
    return words.slice(0, 5).join(' ') + '...'
  }
  
  const handleComplete = (finalResults: { 
    correct: number; 
    wrong: number; 
    byCategory: Record<string, { correct: number; total: number }> 
  }) => {
    setResults(finalResults)
    setShowResults(true)
  }
  
  const handleSuccess = () => {
    // Звук успеха или анимация
  }
  
  const handleError = () => {
    // Звук ошибки или анимация
  }
  
  const handleFlip = () => {
    // Переворот карточки через CustomEvent
    window.dispatchEvent(new CustomEvent('flipCard'))
  }
  
  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex)
  }
  
  const handleRestart = () => {
    setIsRestarting(true)
    setShowResults(false)
    setResults({ correct: 0, wrong: 0, byCategory: {} })
    setCurrentIndex(0)
    
    setTimeout(() => {
      setIsRestarting(false)
    }, 300)
  }
  
  const handleClose = () => {
    window.location.href = '/dashboard.html'
  }
  
  return (
    <>
      {/* Background - за пределами grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>
      </div>

      {/* Main Grid Layout - Desktop View с эффектом телефона */}
      <main className="relative z-10 h-screen w-full max-w-[430px] mx-auto border-x border-white/10 bg-slate-900/50 backdrop-blur-sm">
        
        {/* Flex Container - Header, Content, Footer с justify-between */}
        <div className="h-full flex flex-col justify-between">
          
          {/* HEADER ZONE - h-auto min-h-[60px] - БЕЗ СПОЙЛЕРОВ */}
          <header className="relative z-50 flex flex-nowrap items-center justify-between gap-2 px-3 py-2 h-auto min-h-[60px] bg-slate-900/90 backdrop-blur-sm border-b border-white/10">
            {/* Left: Category Icon + Name */}
            <div className="flex items-center gap-1 text-[10px] font-semibold text-white flex-shrink-0">
              <span className="text-sm">{categoryIcon}</span>
              <span className="truncate max-w-[60px]">{currentQuestion?.category || 'Загрузка'}</span>
            </div>
            
            {/* Center: Подсказка БЕЗ ответа - line-clamp-2 whitespace-normal */}
            <div className="flex-1 px-2 text-center">
              <p className="text-[11px] text-purple-300 line-clamp-2 whitespace-normal leading-tight">
                💡 Подсказка: {getHeaderHint()}
              </p>
            </div>
            
            {/* Right: Counter + Theme Toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-bold text-white whitespace-nowrap">
                {currentIndex + 1}/{questions.length}
              </span>
              <ThemeToggle />
            </div>
          </header>

          {/* CONTENT ZONE - Flexible flex-1 - z-10 */}
          <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
            {!isRestarting && (
              <SwipeCardStack
                questions={questions}
                onComplete={handleComplete}
                onSuccess={handleSuccess}
                onError={handleError}
                onFlip={handleFlip}
                onIndexChange={handleIndexChange}
                t={t}
              />
            )}
          </div>

          {/* FOOTER ZONE - Компактный - z-50 */}
          <footer className="relative z-50 bg-slate-900/90 backdrop-blur-sm border-t border-white/10">
            {/* Кнопки рендерятся внутри SwipeCardStack */}
          </footer>
          
        </div>
      </main>

      {/* Results Modal */}
      <ResultsModal
        isOpen={showResults}
        correct={results.correct}
        wrong={results.wrong}
        total={questions.length}
        byCategory={results.byCategory}
        onRestart={handleRestart}
        onClose={handleClose}
        t={t}
      />
    </>
  )
}
