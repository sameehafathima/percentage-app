import { motion } from 'framer-motion';

export type MascotMood = 'idle' | 'wave' | 'cheer' | 'sad';

interface MascotChefProps {
  mood: MascotMood;
}

export function MascotChef({ mood }: MascotChefProps) {
  const containerVariants = {
    idle: { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    wave: { y: 0 },
    cheer: { y: [-20, 0], scale: [1, 1.05, 1], transition: { duration: 0.5 } },
    sad: { y: 5, rotate: 2, transition: { duration: 0.5 } }
  };

  const armVariants = {
    idle: { rotate: 0 },
    wave: { rotate: [0, 30, -10, 30, -10, 0], transition: { duration: 1.5 } },
    cheer: { rotate: 150, y: -20, transition: { duration: 0.3 } },
    sad: { rotate: -20, transition: { duration: 0.5 } }
  };

  const blinkVariants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 0.15, repeat: Infinity, repeatDelay: 4 }
    }
  };

  const mouthVariants = {
    idle: { d: "M 85 130 Q 100 140 115 130" },
    wave: { d: "M 85 130 Q 100 145 115 130" },
    cheer: { d: "M 80 125 Q 100 155 120 125" },
    sad: { d: "M 85 140 Q 100 130 115 140" }
  };

  return (
    <motion.div
      className="w-48 h-56 relative origin-bottom"
      variants={containerVariants}
      animate={mood}
    >
      <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Back Arm */}
        <motion.path 
          d="M 60 170 C 40 180 30 200 40 210" 
          fill="none" 
          stroke="#e0ac69" 
          strokeWidth="12" 
          strokeLinecap="round"
          style={{ originX: "60px", originY: "170px" }}
        />

        {/* Body/Apron */}
        <path d="M 60 160 C 60 160 50 230 70 240 L 130 240 C 150 230 140 160 140 160 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 60 160 Q 100 170 140 160" fill="none" stroke="#1e3a8a" strokeWidth="4" />
        
        {/* Head */}
        <circle cx="100" cy="115" r="45" fill="#f5d0b5" stroke="#8a5a44" strokeWidth="4" />
        
        {/* Chef Hat */}
        <path d="M 70 80 Q 50 60 70 40 Q 90 20 100 30 Q 110 20 130 40 Q 150 60 130 80 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 65 75 C 65 70 135 70 135 75 L 140 90 L 60 90 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" strokeLinejoin="round" />

        {/* Eyes (blinking) */}
        <motion.g animate="blink" variants={blinkVariants} style={{ originX: '100px', originY: '115px' }}>
          <circle cx="85" cy="115" r="8" fill="#ffffff" stroke="#8a5a44" strokeWidth="2" />
          <circle cx="85" cy="115" r="4" fill="#1e293b" />
          
          <circle cx="115" cy="115" r="8" fill="#ffffff" stroke="#8a5a44" strokeWidth="2" />
          <circle cx="115" cy="115" r="4" fill="#1e293b" />
        </motion.g>

        {/* Mouth */}
        <motion.path 
          variants={mouthVariants}
          fill="none" 
          stroke="#8a5a44" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />

        {/* Cheeks */}
        <circle cx="70" cy="125" r="6" fill="#fca5a5" opacity="0.6" />
        <circle cx="130" cy="125" r="6" fill="#fca5a5" opacity="0.6" />

        {/* Front Arm */}
        <motion.g
          variants={armVariants}
          style={{ originX: "140px", originY: "170px" }}
        >
          <path 
            d="M 140 170 C 160 180 170 200 160 210" 
            fill="none" 
            stroke="#e0ac69" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
