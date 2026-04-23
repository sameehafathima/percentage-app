import { useState } from 'react';
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Level1 } from "@/components/levels/Level1";
import { Level2 } from "@/components/levels/Level2";
import { Level3 } from "@/components/levels/Level3";
import { CustomCursor, ScrollProgress } from "@/components/CustomCursor";
import { StudySatchel } from "@/components/StudySatchel";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Sun, Moon } from "lucide-react";

const queryClient = new QueryClient();

function Home() {
  const [level, setLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen w-full overflow-hidden transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
        <motion.div 
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-[20%] w-96 h-96 rounded-full bg-secondary/30 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <CustomCursor />
      <ScrollProgress />
      
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-background/50 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3">
          <Sprout className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-display font-bold text-foreground">Percentage Garden</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-card rounded-full p-1 border border-border shadow-sm">
            {[1, 2, 3].map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${level === l ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Level {l}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors"
          >
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {level === 1 && <Level1 />}
            {level === 2 && <Level2 />}
            {level === 3 && <Level3 />}
          </motion.div>
        </AnimatePresence>
      </main>
      <StudySatchel />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
