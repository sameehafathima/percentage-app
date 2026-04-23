import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface LiquidTankProps {
  label: string;
  whole: number;
  part: number;
  onChange: (part: number) => void;
  color: string; // e.g. "rgb(167, 243, 208)"
}

export function LiquidTank({ label, whole, part, onChange, color }: LiquidTankProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(300);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  const fillRatio = whole === 0 ? 0 : part / whole;
  const liquidHeight = fillRatio * containerHeight;

  // Render marks
  const marks = [];
  const step = 5;
  for (let i = step; i <= whole; i += step) {
    marks.push(i);
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-xl font-display font-bold">{label}</div>
      <div 
        ref={containerRef}
        className="relative w-32 h-[300px] border-4 border-border rounded-[40px] bg-white/50 backdrop-blur overflow-hidden shadow-inner flex flex-col justify-end"
      >
        {/* Background marks */}
        <div className="absolute inset-0 pointer-events-none">
          {marks.map((m) => {
            const bottomPercent = (m / whole) * 100;
            return (
              <div 
                key={m} 
                className="absolute left-0 w-4 border-b-2 border-border/50"
                style={{ bottom: `${bottomPercent}%` }}
              />
            );
          })}
        </div>

        {/* Liquid */}
        <motion.div 
          className="relative w-full overflow-hidden"
          animate={{ height: liquidHeight }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ backgroundColor: color }}
        >
          <svg className="absolute top-0 w-[200%] h-8 -translate-y-1/2 left-0 text-white/30 fill-current" viewBox="0 0 200 20" preserveAspectRatio="none">
            <motion.path 
              d="M0 10 Q25 20, 50 10 T100 10 T150 10 T200 10 L200 20 L0 20 Z"
              animate={{ x: [0, -100] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </svg>
        </motion.div>

        {/* Draggable Handle */}
        <motion.div
          drag="y"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={(event, info) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const y = info.point.y - rect.top; // y from top
            const bottomY = rect.height - y;
            let newRatio = bottomY / rect.height;
            newRatio = Math.max(0, Math.min(1, newRatio));
            const newPart = Math.round(newRatio * whole);
            onChange(newPart);
          }}
          className="absolute left-1/2 -translate-x-1/2 w-16 h-4 bg-white border-2 border-border rounded-full cursor-ns-resize shadow-md hover:scale-110 transition-transform"
          style={{ bottom: `calc(${fillRatio * 100}% - 8px)` }}
        />
      </div>

      <div className="text-center">
        <div className="text-2xl font-mono font-bold text-primary">{part} / {whole}</div>
        <div className="text-sm text-muted-foreground">{Math.round((part/whole)*100 || 0)}%</div>
      </div>
    </div>
  );
}
