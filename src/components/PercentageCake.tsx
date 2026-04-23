import { motion } from 'framer-motion';

interface PercentageCakeProps {
  pct: number; // 0 to 100
}

export function PercentageCake({ pct }: PercentageCakeProps) {
  const cakeHeight = 80;
  const fillRatio = Math.max(0, Math.min(100, pct)) / 100;
  const fillHeight = fillRatio * cakeHeight;

  return (
    <div className="relative w-48 h-48 flex items-end justify-center">
      {/* Floating Badge */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 12 }}
        className="absolute -top-4 -right-4 z-10"
      >
        <motion.div 
          animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-primary text-primary-foreground font-bold text-sm px-3 py-2 rounded-full shadow-lg border-2 border-white transform rotate-6"
        >
          {Math.round(pct)}% FILLED
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/50 w-0.5 h-6 -rotate-45 -z-10" />
        </motion.div>
      </motion.div>

      <svg viewBox="0 0 200 160" className="w-full drop-shadow-md overflow-visible">
        {/* Cake Base Sponge */}
        <path d="M 20 120 C 20 150 180 150 180 120 L 180 80 C 180 50 20 50 20 80 Z" fill="#fcd34d" stroke="#b45309" strokeWidth="3" strokeLinejoin="round" />
        
        {/* Cream Fill Layer (animated height) */}
        <clipPath id="cakeClip">
          <path d="M 20 120 C 20 150 180 150 180 120 L 180 80 C 180 50 20 50 20 80 Z" />
        </clipPath>
        
        <g clipPath="url(#cakeClip)">
          <motion.rect 
            x="20" 
            y={130 - fillHeight} 
            width="160" 
            height={fillHeight + 20} 
            fill="#fbcfe8" 
            animate={{ y: 130 - fillHeight, height: fillHeight + 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
        </g>
        
        {/* Outline over fill */}
        <path d="M 20 120 C 20 150 180 150 180 120" fill="none" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />

        {/* Top Icing Drip */}
        <path d="M 20 80 C 20 50 180 50 180 80 C 180 90 160 100 150 85 C 140 70 120 95 110 80 C 100 65 80 95 70 85 C 60 75 40 90 20 80 Z" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" strokeLinejoin="round" />

        {/* Strawberries */}
        <g transform="translate(60, 50)">
          <path d="M 0 10 Q 5 -5 10 10 Q 5 20 0 10" fill="#ef4444" />
          <path d="M 5 0 L 2 5 M 5 0 L 8 5 M 5 0 L 5 7" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(130, 55) scale(0.8)">
          <path d="M 0 10 Q 5 -5 10 10 Q 5 20 0 10" fill="#ef4444" />
          <path d="M 5 0 L 2 5 M 5 0 L 8 5 M 5 0 L 5 7" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Candle */}
        {pct === 100 && (
          <motion.g 
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <rect x="95" y="25" width="10" height="30" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" rx="2" />
            <path d="M 100 25 L 100 20" fill="none" stroke="#333" strokeWidth="1" />
            {/* Flame */}
            <motion.path 
              d="M 100 20 Q 95 10 100 5 Q 105 10 100 20" 
              fill="#fbbf24" 
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{ originX: "100px", originY: "20px" }}
            />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
