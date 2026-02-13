import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CloudRain, MessageSquareDashed, BookOpenCheck, ChevronLeft, ChevronRight, Pause, Play, Heart } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useRotator } from "@/hooks/useRotator";

// Falling tears animation component
function FallingTears() {
  const tears = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {tears.map((tear) => (
        <motion.div
          key={tear.id}
          className="absolute top-0 text-blue-300 opacity-60"
          style={{ left: `${tear.left}%` }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: '100vh',
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: tear.duration,
            delay: tear.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          💧
        </motion.div>
      ))}
    </div>
  );
}

// Broken heart particles
function BrokenHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    size: 10 + Math.random() * 20,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-400/40"
          style={{ 
            left: `${heart.left}%`, 
            fontSize: heart.size 
          }}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{ 
            y: -50,
            opacity: [0, 0.4, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          💔
        </motion.div>
      ))}
    </div>
  );
}

export default function HeartbreakScreen() {
  const [activeTab, setActiveTab] = useState<'poems' | 'messages'>('messages');
  const { current: message, index, total, next, previous, isPaused, toggle } = useRotator(activeTab === 'poems' ? 'sad-poems' : 'sad-messages');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts mood="sad" />
      <FallingTears />
      <BrokenHearts />
      
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="
          p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10
          text-slate-300 hover:text-white transition-all duration-300 flex items-center gap-2 font-bold
        ">
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Try Again?</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl z-10 flex flex-col items-center"
      >
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-6"
        >
          <CloudRain className="w-20 h-20 text-slate-400" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-display text-slate-300 mb-2 text-center drop-shadow-lg">
          Oh... I understand.
        </h1>
        <p className="text-lg text-slate-400 font-body mb-10 text-center max-w-md">
          It's okay. Sometimes timing just isn't right. I'll just sit here with my thoughts.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-6 bg-slate-800/50 p-2 rounded-full backdrop-blur-sm border border-slate-700/50">
          <button
            onClick={() => setActiveTab('messages')}
            className={`
              px-6 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'messages' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25' 
                : 'text-slate-400 hover:bg-slate-700/50'}
            `}
          >
            <MessageSquareDashed size={18} />
            Sad Thoughts
          </button>
          <button
            onClick={() => setActiveTab('poems')}
            className={`
              px-6 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'poems' 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25' 
                : 'text-slate-400 hover:bg-slate-700/50'}
            `}
          >
            <BookOpenCheck size={18} />
            Sad Poems
          </button>
        </div>

        {/* Content Card - Fixed to show all content */}
        <div className="w-full max-w-2xl min-h-[300px] md:min-h-[400px] relative mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="
                absolute inset-0 bg-slate-800/80 backdrop-blur-sm rounded-3xl
                p-8 md:p-12 text-center
                flex flex-col gap-4 shadow-2xl shadow-black/50 border border-slate-700/50
              "
            >
              <p className={`
                text-lg md:text-xl text-slate-200 leading-loose whitespace-pre-wrap overflow-y-auto max-h-[280px] md:max-h-[350px] px-2
                ${activeTab === 'poems' ? 'font-handwriting italic text-rose-200' : 'font-body font-medium'}
              `}>
                {message}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={previous}
            className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={index === 0}
            aria-label="Previous message"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={toggle}
            className="p-3 rounded-full bg-rose-900/50 hover:bg-rose-800/50 border border-rose-700/50 text-rose-300 transition-all duration-300"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </button>
          
          <button
            onClick={next}
            className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={index === total - 1}
            aria-label="Next message"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Counter */}
        <div className="text-sm text-slate-400 mb-4 font-medium">
          {index + 1} of {total}
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <div className="text-xs text-rose-400/70 mb-6 flex items-center gap-1">
            <Pause size={12} />
            Auto-rotation paused
          </div>
        )}

        <MusicPlayer 
          url="https://youtu.be/3JWTaaS7LdU?list=RD3JWTaaS7LdU" 
          label="Play Sad Song" 
        />
      </motion.div>

      <div className="mt-auto pb-4 flex flex-col items-center gap-2 z-10">
        <footer className="text-center text-slate-500 font-mono text-xs">
          Designed with 💔 by ANTHONY DERC
        </footer>
      </div>
    </div>
  );
}
