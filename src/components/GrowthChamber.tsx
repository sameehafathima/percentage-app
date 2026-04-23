import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { triggerBloomConfetti } from '@/components/Confetti';

interface GrowthChamberProps {
  part: number;
  whole: number;
  onPartChange: (newPart: number) => void;
  targetPercent?: number;
  isCompareMode?: boolean;
}

export function GrowthChamber({ part, whole, onPartChange, targetPercent, isCompareMode }: GrowthChamberProps) {
  const { playChime } = useSound();
  const [isWilting, setIsWilting] = useState(false);
  const [hasBloomed, setHasBloomed] = useState(false);
  
  const cellsPerPart = 100 / whole;
  const currentPercent = Math.round((part / whole) * 100);
  
  useEffect(() => {
    if (targetPercent !== undefined) {
      if (currentPercent === targetPercent) {
        setHasBloomed(true);
        triggerBloomConfetti();
        playChime();
        setIsWilting(false);
      } else if (part > 0 && currentPercent > targetPercent) {
        setIsWilting(true);
        setHasBloomed(false);
      } else {
        setIsWilting(false);
        setHasBloomed(false);
      }
    }
  }, [currentPercent, targetPercent, part, playChime]);

  const handleCellClick = (index: number) => {
    const isFilled = index < part * cellsPerPart;
    if (isFilled) {
      // Removing
      onPartChange(Math.max(0, Math.floor(index / cellsPerPart)));
    } else {
      // Adding
      onPartChange(Math.min(whole, Math.floor(index / cellsPerPart) + 1));
    }
  };

  return (
    <div className={`p-6 rounded-3xl backdrop-blur-md bg-white/40 border border-white/60 shadow-xl ${isCompareMode ? 'scale-90' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display text-sidebar-foreground">Growth Chamber</h2>
        <div className="flex flex-col items-end">
          <motion.div 
            key={currentPercent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-primary"
          >
            {currentPercent}%
          </motion.div>
          <div className="text-sm text-muted-foreground font-mono">
            {part} / {whole}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-10 gap-1 sm:gap-2 max-w-[500px] mx-auto p-4 rounded-xl bg-background/50"
        animate={isWilting ? { rotate: [0, -2, 2, -2, 0], scale: [1, 0.98, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 100 }).map((_, i) => {
          const isFilled = i < part * cellsPerPart;
          const isBlooming = hasBloomed && isFilled;
          const isHovered = false; // Add hover logic later
          
          return (
            <motion.button
              key={i}
              onClick={() => handleCellClick(i)}
              className={`aspect-square rounded-full flex items-center justify-center transition-colors interactive
                ${isFilled ? 'bg-primary shadow-sm' : 'bg-white/50 hover:bg-white/80'}
                ${isWilting && isFilled ? 'opacity-50 grayscale' : ''}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={false}
              animate={isBlooming ? { scale: [1, 1.2, 1], backgroundColor: '#a7f3d0' } : {}}
              transition={{ delay: isBlooming ? (i % 10) * 0.05 : 0 }}
            >
              {isBlooming && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-full h-full text-green-700 p-1"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22v-8m-4-4a4 4 0 1 1 4 4m0 0a4 4 0 1 0 4-4" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
      
      {isWilting && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 text-destructive font-medium"
        >
          Almost! Try planting fewer seeds.
        </motion.p>
      )}
    </div>
  );
}
