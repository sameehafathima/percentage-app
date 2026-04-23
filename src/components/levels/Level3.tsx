import { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidTank } from '@/components/LiquidTank';
import { AggregatorGarden } from '@/components/AggregatorGarden';
import { triggerBloomConfetti } from '@/components/Confetti';

const level3Problems = [
  { subject1: "English", part1: 25, whole1: 40, subject2: "SocStud", part2: 35, whole2: 60, targetPercent: 60 },
  { subject1: "Math", part1: 18, whole1: 25, subject2: "Science", part2: 27, whole2: 30, targetPercent: 81 },
  { subject1: "Art", part1: 14, whole1: 20, subject2: "Music", part2: 22, whole2: 25, targetPercent: 80 },
  { subject1: "History", part1: 32, whole1: 45, subject2: "Geography", part2: 28, whole2: 40, targetPercent: 70 },
  { subject1: "PE", part1: 19, whole1: 22, subject2: "Health", part2: 16, whole2: 20, targetPercent: 83 }
];

export function Level3() {
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = level3Problems[problemIndex];
  
  const [part1, setPart1] = useState(0);
  const [part2, setPart2] = useState(0);
  
  const [showError, setShowError] = useState(false);

  const checkAnswer = () => {
    const sumParts = part1 + part2;
    const sumWholes = problem.whole1 + problem.whole2;
    const pct = sumWholes === 0 ? 0 : Math.round((sumParts / sumWholes) * 100);
    
    if (pct === problem.targetPercent && part1 === problem.part1 && part2 === problem.part2) {
      triggerBloomConfetti();
      setShowError(false);
      setTimeout(() => {
        if (problemIndex < level3Problems.length - 1) {
          setProblemIndex(problemIndex + 1);
          setPart1(0);
          setPart2(0);
        } else {
          setProblemIndex(0);
          setPart1(0);
          setPart2(0);
        }
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-card/60 backdrop-blur-lg rounded-3xl shadow-sm border border-card-border"
      >
        <h2 className="text-3xl font-display text-primary mb-2">Level 3: The Aggregator</h2>
        <p className="text-xl text-foreground/80">Combine two subjects into one total percentage!</p>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 flex flex-col items-center space-y-8">
          <div className="flex gap-12 justify-center w-full">
            <LiquidTank 
              label={problem.subject1} 
              whole={problem.whole1} 
              part={part1} 
              onChange={setPart1} 
              color="var(--primary)" 
            />
            <LiquidTank 
              label={problem.subject2} 
              whole={problem.whole2} 
              part={part2} 
              onChange={setPart2} 
              color="var(--secondary)" 
            />
          </div>
          
          <motion.div
            animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <AggregatorGarden 
              parts={[part1, part2]} 
              wholes={[problem.whole1, problem.whole2]} 
            />
          </motion.div>
        </div>
        
        <div className="md:col-span-4 space-y-6">
          <div className="p-6 bg-card/80 backdrop-blur rounded-3xl border border-border shadow-md">
            <h3 className="text-xl font-bold mb-4">Target Goal</h3>
            <div className="text-4xl font-display text-primary mb-6">{problem.targetPercent}% Combined</div>
            <p className="text-muted-foreground mb-6">
              Match the parts for {problem.subject1} ({problem.part1}/{problem.whole1}) and {problem.subject2} ({problem.part2}/{problem.whole2}) to find the combination that makes exactly {problem.targetPercent}% total.
            </p>
            
            {showError && (
              <p className="text-destructive font-bold mb-4 text-center">Almost — adjust the tanks!</p>
            )}

            <button
              onClick={checkAnswer}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95"
            >
              Check Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
