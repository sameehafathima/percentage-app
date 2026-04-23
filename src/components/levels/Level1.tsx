import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GrowthChamber } from '@/components/GrowthChamber';
import { WholeDial } from '@/components/WholeDial';
import { level1Problems } from '@/data/problems';
import { MascotChef } from '@/components/MascotChef';
import { PercentageCake } from '@/components/PercentageCake';

export function Level1() {
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = level1Problems[problemIndex];
  
  const [part, setPart] = useState(0);
  
  const handleNext = () => {
    if (problemIndex < level1Problems.length - 1) {
      setProblemIndex(problemIndex + 1);
      setPart(0);
    }
  };

  const isCorrect = part > 0 && Math.round((part / problem.whole) * 100) === problem.targetPercent;
  const mood = isCorrect ? 'cheer' : part > problem.targetPercent ? 'sad' : 'idle';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-card/60 backdrop-blur-lg rounded-3xl shadow-sm border border-card-border"
      >
        <h2 className="text-3xl font-display text-primary mb-2">Level 1: The Part</h2>
        <p className="text-xl text-foreground/80">{problem.text}</p>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <GrowthChamber 
            part={part} 
            whole={problem.whole} 
            onPartChange={setPart}
            targetPercent={problem.targetPercent}
          />
        </div>
        <div className="md:col-span-4 space-y-6">
          <div className="flex flex-col items-center p-6 bg-white/40 backdrop-blur border border-white/60 rounded-3xl shadow-lg gap-6">
            <MascotChef mood={mood} />
            <PercentageCake pct={(part / problem.whole) * 100} />
          </div>

          <WholeDial 
            whole={problem.whole} 
            onChange={() => {}} // Locked for level 1
            allowedWholes={[problem.whole]}
          />
          
          {isCorrect && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Next Challenge! ✨
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
