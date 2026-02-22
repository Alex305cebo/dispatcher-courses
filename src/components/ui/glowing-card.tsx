'use client';

import { useRef, useEffect } from 'react';
import { GlowingEffect } from './glowing-effect';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlowingCard({ children, className = '', onClick }: GlowingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 transition-all cursor-pointer hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(99,102,241,0.3)] hover:translate-y-[-4px] group ${className}`}
    >
      <GlowingEffect disabled={false} blur={10} spread={20} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
