import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotebookPen, X } from 'lucide-react';
import { Whiteboard, WhiteboardRef } from './Whiteboard';
import { DivisionHelpers } from './DivisionHelpers';

export function StudySatchel() {
  const [isOpen, setIsOpen] = useState(false);
  const whiteboardRef = useRef<WhiteboardRef>(null);

  const handleDropTemplate = (text: string) => {
    whiteboardRef.current?.drawTemplate(text);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-full shadow-xl hover:shadow-2xl border-4 border-white/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <NotebookPen className="w-6 h-6" />
        <span className="font-bold text-lg hidden sm:inline">Study Satchel</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-none"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[540px] bg-white/80 backdrop-blur-xl border-l border-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-white/50">
                <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                  <NotebookPen className="w-5 h-5 text-primary" />
                  Study Satchel — Long Division Workspace
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col overflow-auto">
                <div className="h-[60%] min-h-[300px] border-b border-border bg-black/5 p-4">
                  <Whiteboard ref={whiteboardRef} />
                </div>
                <div className="h-[40%] min-h-[200px] bg-white/50">
                  <DivisionHelpers onDropTemplate={handleDropTemplate} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
