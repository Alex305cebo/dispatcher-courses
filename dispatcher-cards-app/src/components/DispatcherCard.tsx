'use client'

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Question } from '@/data/questions'

interface DispatcherCardProps {
  question: Question
  onSwipe: (direction: 'left' | 'right') => void
  isTop: boolean
  index: number
  t: (key: string) => string
  triggerSwipe?: 'left' | 'right' | null
  onFlip?: () => void
  registerSwipeHandler?: (handler: (direction: 'left' | 'right') => void) => void
}

const SWIPE_THRESHOLD = 100

export default function DispatcherCard({ 
  question, 
  onSwipe, 
  isTop, 
  t,
  triggerSwipe,
  registerSwipeHandler
}: DispatcherCardProps) {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacityLeft = useTransform(x, [-150, -50, 0], [1, 0.5, 0])
  const opacityRight = useTransform(x, [0, 50, 150], [0, 0.5, 1])
  
  // Слушаем CustomEvent для переворота карточки
  useEffect(() => {
    const handleFlipEvent = () => {
      if (isTop) {
        setIsFlipped(prev => !prev)
      }
    }
    
    window.addEventListener('flipCard', handleFlipEvent)
    return () => window.removeEventListener('flipCard', handleFlipEvent)
  }, [isTop])
  
  // Регистрация обработчика свайпа для программного управления
  useEffect(() => {
    if (registerSwipeHandler) {
      registerSwipeHandler((direction: 'left' | 'right') => {
        setExitDirection(direction)
        onSwipe(direction)
      })
    }
  }, [registerSwipeHandler, onSwipe])
  
  // Программный свайп при нажатии на кнопки
  useEffect(() => {
    if (triggerSwipe && isTop) {
      setExitDirection(triggerSwipe)
    }
  }, [triggerSwipe, isTop])
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    
    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? 'right' : 'left'
      setExitDirection(direction)
      onSwipe(direction)
    }
  }
  
  // Название категории без префикса
  const categoryName = question?.category || 'Загрузка'
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        scale: isTop ? 1 : 0.95,
        zIndex: isTop ? 10 : 5,
        transformStyle: 'preserve-3d',
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      onTap={() => isTop && setIsFlipped(!isFlipped)}
      animate={exitDirection ? {
        x: exitDirection === 'right' ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.3 }
      } : {
        rotateY: isFlipped ? 180 : 0
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Glowing Effect Border */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
        {/* Animated Glow */}
        {isTop && !isFlipped && (
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse blur-xl"></div>
          </div>
        )}
        
        {/* Card Front Side - text (вопрос) и hint (наводка) */}
        <div 
          className="absolute inset-0 rounded-2xl p-4 backdrop-blur-xl border-2 border-white/30 bg-slate-900/90 flex flex-col shadow-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          
          {/* Category Badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full mb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-semibold shadow-lg flex-shrink-0">
            <span className="text-sm">🎯</span>
            <span>{categoryName}</span>
          </div>
          
          {/* Text - Вопрос (полностью видимый) */}
          <h2 className="text-[16.5px] font-bold mb-2 leading-tight text-white flex-shrink-0">
            {question?.text || 'Загрузка...'}
          </h2>
          
          {/* Hint - Наводка (серый, мелкий) с красивым скроллингом */}
          <div className="flex-1 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/70 touch-pan-y">
            <p className="text-[12px] text-gray-400 leading-relaxed italic pr-2">
              {question?.hint || 'Подумайте над вопросом...'}
            </p>
          </div>
          
          {/* Подсказка о перевороте */}
          <div className="text-center flex-shrink-0 mt-2">
            <p className="text-purple-300 text-[11px] opacity-70">
              Сделай свайп либо нажми на карточку для правильного ответа
            </p>
          </div>
          
          {/* Swipe Indicators - только для верхней карточки */}
          {isTop && !isFlipped && (
            <>
              <motion.div
                style={{ opacity: opacityLeft }}
                className="absolute top-3 left-3 pointer-events-none"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white shadow-2xl border-4 border-white transform -rotate-12">
                  <span className="text-2xl font-black">✗</span>
                </div>
              </motion.div>
              
              <motion.div
                style={{ opacity: opacityRight }}
                className="absolute top-3 right-3 pointer-events-none"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-2xl border-4 border-white transform rotate-12">
                  <span className="text-2xl font-black">✓</span>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Card Back Side - analytics (полный разбор) */}
        <div 
          className="absolute inset-0 rounded-2xl backdrop-blur-xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 shadow-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Слой с текстом поверх */}
          <div className="relative z-10 p-5 flex flex-col h-full">
            {/* Правильный ответ - Крупно */}
            <div className="text-center mb-4 flex-shrink-0">
              <div className="text-6xl mb-3">
                {question?.isCorrect ? '✓' : '✗'}
              </div>
              <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                {question?.isCorrect ? 'ДА' : 'НЕТ'}
              </h3>
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                <p className="text-sm font-semibold text-purple-200">
                  Правильный ответ на вопрос
                </p>
              </div>
            </div>
            
            {/* Analytics - Полный разбор - Scrollable с красивым скроллингом */}
            <div className="flex-1 overflow-y-auto mb-4 px-2 scrollbar-thin scrollbar-thumb-purple-300/50 scrollbar-track-transparent hover:scrollbar-thumb-purple-300/70 touch-pan-y">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h4 className="text-sm font-bold text-purple-200 mb-3 flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  Подробный разбор:
                </h4>
                <p className="text-gray-100 text-sm leading-relaxed pr-2">
                  {question?.analytics || 'Пример: Согласно правилам FMCSA, водитель может управлять траком максимум 11 часов после 10 последовательных часов отдыха. Это важное правило безопасности, которое помогает предотвратить усталость водителей и снизить риск аварий на дорогах.'}
                </p>
              </div>
            </div>
            
            {/* Подсказка о возврате */}
            <div className="text-center flex-shrink-0">
              <p className="text-purple-200 text-xs opacity-80 font-medium">
                👆 Нажмите снова, чтобы вернуться к вопросу
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
