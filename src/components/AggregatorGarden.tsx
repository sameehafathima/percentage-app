import { motion } from 'framer-motion';

interface AggregatorGardenProps {
  parts: [number, number];
  wholes: [number, number];
}

export function AggregatorGarden({ parts, wholes }: AggregatorGardenProps) {
  const sumParts = parts[0] + parts[1];
  const sumWholes = wholes[0] + wholes[1];
  const percentage = sumWholes === 0 ? 0 : Math.round((sumParts / sumWholes) * 100);
  const bloomedCount = percentage;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white/40 backdrop-blur rounded-3xl border border-white/60 shadow-lg">
      <div className="text-center">
        <h3 className="text-xl font-display font-bold text-foreground">Combined View</h3>
        <div className="text-3xl font-mono font-bold text-primary mt-2">
          {sumParts} / {sumWholes} = {percentage}%
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5 sm:gap-2 max-w-[400px] bg-black/5 p-4 rounded-2xl">
        {Array.from({ length: 100 }).map((_, i) => {
          const isBloomed = i < bloomedCount;
          return (
            <motion.div
              key={i}
              className={`aspect-square rounded-full transition-colors flex items-center justify-center ${isBloomed ? 'bg-primary shadow-sm' : 'bg-black/10'}`}
              initial={false}
              animate={isBloomed ? { scale: [1, 1.2, 1], backgroundColor: 'var(--primary)' } : { scale: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}
              transition={{ delay: isBloomed ? (i % 10) * 0.03 : 0 }}
            >
              {isBloomed && (
                <svg className="w-3/4 h-3/4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V12" />
                  <path d="M12 12C12 12 10 7 6 7C2 7 2 12 6 12C8 12 12 12 12 12Z" />
                  <path d="M12 12C12 12 14 7 18 7C22 7 22 12 18 12C16 12 12 12 12 12Z" />
                </svg>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
