
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, MessageCircleHeart, BookHeart, Clock, ChevronLeft, ChevronRight, Pause, Play, Heart, Star } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useRotator } from "@/hooks/useRotator";

// Blowing kisses animation
function BlowingKisses() {
  const kisses = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {kisses.map((kiss) => (
        <motion.div
          key={kiss.id}
          className="absolute text-rose-400"
          style={{ 
            left: `${kiss.left}%`,
            bottom: 0,
            fontSize: '1.5rem'
          }}
          initial={{ y: 50, opacity: 0, scale: 0.5 }}
          animate={{ 
            y: -window.innerHeight,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1.2, 0.8],
            x: [0, 30, -30, 0]
          }}
          transition={{
            duration: kiss.duration,
            delay: kiss.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          💋
        </motion.div>
      ))}
    </div>
  );
}

// Sparkle stars
function SparkleStars() {
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-300"
          style={{ 
            left: `${star.left}%`, 
            top: `${star.top}%`,
            fontSize: star.size
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}

// Floating romantic elements
function FloatingRomance() {
  const elements = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 4,
    emoji: ['💕', '💗', '💖', '💘', '💝', '🌹', '🍫', '🥰'][i % 8],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-rose-300/60"
          style={{ 
            left: `${el.left}%`,
            fontSize: '1.5rem'
          }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ 
            y: '-10%',
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, -20, 20, 0]
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default function LoveScreen() {
  const [activeTab, setActiveTab] = useState<'poems' | 'messages'>('messages');
  const { current: message, index, total, next, previous, isPaused, toggle } = useRotator(activeTab === 'poems' ? 'love-poems' : 'love-messages');
  
  const [data] = useState({
    myName: localStorage.getItem("myName") || "Someone",
    partnerName: localStorage.getItem("partnerName") || "My Love",
    metDate: localStorage.getItem("metDate") || "",
  });

  const calculateDays = () => {
    if (!data.metDate) return null;
    const start = new Date(data.metDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts mood="happy" />
      <BlowingKisses />
      <SparkleStars />
      <FloatingRomance />
      
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-rose-200/30 via-transparent to-transparent pointer-events-none" />

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <Link href="/" className="
          p-3 rounded-full bg-white/80 hover:bg-white shadow-md text-foreground/80 hover:text-primary
          transition-all duration-300 flex items-center gap-2 font-bold
        ">
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <Link href="/memories" className="
          p-3 rounded-full bg-rose-500 hover:bg-rose-600 shadow-md text-white
          transition-all duration-300 flex items-center gap-2 font-bold
        ">
          <Heart size={20} />
          <span className="hidden sm:inline">Memories</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10 flex flex-col items-center"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mb-4"
        >
          <Sparkles className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-4xl md:text-6xl font-display text-primary mb-2 text-center drop-shadow-md"
        >
          Yay! {data.partnerName}, I Love You! ❤️
        </motion.h1>

        {days !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-lg shadow-rose-200/30"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-primary/20 p-3 rounded-full text-primary"
            >
              <Clock size={24} />
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-bold text-primary uppercase tracking-wider">Our Journey</p>
              <p className="text-lg font-body text-foreground/80">
                It's been <span className="text-primary font-bold text-xl">{days} days</span> since we met, and every single one has been a gift.
              </p>
            </div>
          </motion.div>
        )}

        <p className="text-lg text-muted-foreground font-handwriting mb-8 text-center max-w-lg">
          {data.myName} is so lucky to have you. Here is something special. 💕
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-6 bg-white/60 p-2 rounded-full backdrop-blur-sm shadow-lg shadow-rose-200/20">
          <button
            onClick={() => setActiveTab('messages')}
            className={`
              px-6 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'messages' 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25' 
                : 'text-muted-foreground hover:bg-white/50'}
            `}
          >
            <MessageCircleHeart size={18} />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('poems')}
            className={`
              px-6 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'poems' 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25' 
                : 'text-muted-foreground hover:bg-white/50'}
            `}
          >
            <BookHeart size={18} />
            Poems
          </button>
        </div>

        {/* Content Card - Enhanced with scroll */}
        <div className="w-full max-w-2xl min-h-[300px] md:min-h-[400px] relative mb-4 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, scale: 0.9, rotateX: -10, y: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateX: 10, y: -20 }}
              transition={{ duration: 0.5 }}
              className="
                absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl
                p-8 md:p-12 text-center
                flex flex-col gap-4 shadow-2xl shadow-rose-200/50 border border-white/50
              "
            >
              <p className={`
                text-lg md:text-xl text-foreground leading-loose whitespace-pre-wrap overflow-y-auto max-h-[280px] md:max-h-[350px] px-2
                ${activeTab === 'poems' ? 'font-handwriting italic text-rose-600' : 'font-display'}
              `}>
                {message}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={previous}
            className="p-3 rounded-full bg-white/80 hover:bg-white shadow-md text-primary hover:text-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={index === 0}
            aria-label="Previous message"
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-500/30 text-white transition-all duration-300"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="p-3 rounded-full bg-white/80 hover:bg-white shadow-md text-primary hover:text-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={index === total - 1}
            aria-label="Next message"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Counter */}
        <div className="text-sm text-muted-foreground mb-6 font-medium flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          {index + 1} of {total}
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-primary/70 mb-4 flex items-center gap-1"
          >
            <Pause size={12} />
            Auto-rotation paused
          </motion.div>
        )}

        <div className="mb-8">
          <MusicPlayer 
            url="https://youtu.be/asZm5gHknmU?list=RDasZm5gHknmU" 
            label="Play Our Love Song" 
          />
        </div>
      </motion.div>

      <footer className="mt-auto pb-4 text-center text-muted-foreground/60 font-mono text-xs z-10">
        Designed with ❤️ by ANTHONY DERC
      </footer>
    </div>
  );
}

