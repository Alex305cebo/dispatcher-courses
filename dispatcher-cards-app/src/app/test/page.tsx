'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import SwipeCardStack from '@/components/SwipeCardStack'
import ResultsModal from '@/components/ResultsModal'
import ThemeToggle from '@/components/ThemeToggle'
import { questions as allQuestions } from '@/data/questions'
import { createTranslator, defaultLocale } from '@/lib/i18n'

// Функция для перемешивания массива
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function TestContent() {
  const searchParams = useSearchParams()
  const difficulty = searchParams.get('difficulty') || 'medium'
  const userName = searchParams.get('name') || 'Гость'
  
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ 
    correct: 0, 
    wrong: 0, 
    byCategory: {} as Record<string, { correct: number; total: number }> 
  })
  const [isRestarting, setIsRestarting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionQuestions, setSessionQuestions] = useState<typeof allQuestions>([])
  
  // Настройки по сложности
  const difficultySettings = {
    easy: { questions: 15, maxErrors: 10, icon: '🟢', name: 'Легкий' },
    medium: { questions: 30, maxErrors: 15, icon: '🟡', name: 'Средний' },
    hard: { questions: 50, maxErrors: 20, icon: '🔴', name: 'Сложный' }
  }
  
  const settings = difficultySettings[difficulty as keyof typeof difficultySettings] || difficultySettings.medium
  
  useEffect(() => {
    if (sessionQuestions.length === 0) {
      const shuffled = shuffleArray(allQuestions)
      setSessionQuestions(shuffled.slice(0, settings.questions))
    }
  }, [sessionQuestions.length, settings.questions])
  
  const t = createTranslator(defaultLocale)
  const currentQuestion = sessionQuestions[currentIndex] || null
  const categoryIcon = currentQuestion?.category === 'Законодательство' ? '⚖️' :
                       currentQuestion?.category === 'Финансы' ? '💰' :
                       currentQuestion?.category === 'Переговоры' ? '🤝' :
                       currentQuestion?.category === 'Основы работы' ? '🚛' :
                       currentQuestion?.category === 'Безопасность' ? '🛡️' :
                       currentQuestion?.category === 'Документация' ? '📄' : '🎯'
  
  const handleComplete = (finalResults: { 
    correct: number; 
    wrong: number; 
    byCategory: Record<string, { correct: number; total: number }> 
  }) => {
    setResults(finalResults)
    setShowResults(true)
  }
  
  const handleSuccess = () => {}
  const handleError = () => {}
  const handleFlip = () => {
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
    
    const shuffled = shuffleArray(allQuestions)
    setSessionQuestions(shuffled.slice(0, settings.questions))
    
    setTimeout(() => {
      setIsRestarting(false)
    }, 300)
  }
  
  const handleClose = () => {
    window.location.href = '/'
  }
  
  return (
    <>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
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
        </div>
      </div>

      <main className="relative z-10 h-screen w-full max-w-[430px] mx-auto border-x border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="h-full grid grid-rows-[auto_1fr_auto]">
          
          <header className="relative z-50 flex flex-nowrap items-center justify-between gap-2 px-3 py-2 h-auto bg-slate-900/90 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center gap-1 text-[12px] font-semibold text-white flex-shrink-0">
              <span className="text-base">{categoryIcon}</span>
              <span className="truncate max-w-[60px]">{currentQuestion?.category || 'Загрузка'}</span>
            </div>
            
            <div className="flex-1 px-2 text-center">
              <p className="text-[13px] text-purple-300 line-clamp-2 whitespace-normal leading-tight">
                💡 Наводка: {currentQuestion?.shortHint || 'Подумайте над вопросом...'}
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[12px] font-bold text-white whitespace-nowrap">
                {currentIndex + 1}/{settings.questions}
              </span>
              <ThemeToggle />
            </div>
          </header>

          <div className="relative z-10 overflow-hidden flex flex-col">
            {!isRestarting && sessionQuestions.length > 0 && (
              <SwipeCardStack
                questions={sessionQuestions}
                maxWrongAnswers={settings.maxErrors}
                onComplete={handleComplete}
                onSuccess={handleSuccess}
                onError={handleError}
                onFlip={handleFlip}
                onIndexChange={handleIndexChange}
                t={t}
              />
            )}
          </div>

          <footer className="relative z-50 bg-slate-900/90 backdrop-blur-sm border-t border-white/10 px-3 py-2">
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>{settings.icon} {settings.name}</span>
              <span>👤 {userName}</span>
            </div>
          </footer>
          
        </div>
      </main>

      <ResultsModal
        isOpen={showResults}
        correct={results.correct}
        wrong={results.wrong}
        total={sessionQuestions.length}
        byCategory={results.byCategory}
        onRestart={handleRestart}
        onClose={handleClose}
        t={t}
      />
    </>
  )
}


export default function TestPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    }>
      <TestContent />
    </Suspense>
  )
}
