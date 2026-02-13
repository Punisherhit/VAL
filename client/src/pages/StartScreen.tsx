import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartCrack, Calendar, Users } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";

export default function StartScreen() {
  const [, setLocation] = useLocation();
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  
  // Fun mechanic: Make the NO button run away slightly on desktop
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    if (window.innerWidth > 768) {
      setNoBtnPos({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      });
    }
    setIsHoveringNo(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts mood="happy" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="glass-card p-8 md:p-12 max-w-2xl w-full text-center relative z-10 mx-4"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-6"
        >
          <Heart className="w-20 h-20 text-primary fill-primary/20" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-sm">
          Will you be my Valentine?
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-handwriting mb-12">
          I've been waiting to ask you...
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center h-32 relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation("/setup")}
            className="
              px-10 py-4 rounded-full text-xl font-bold shadow-xl
              bg-gradient-to-r from-primary to-rose-500 text-white
              shadow-primary/30 hover:shadow-primary/50
              flex items-center gap-2 z-20
            "
          >
            <Heart className="fill-current w-5 h-5" />
            YES, I will!
          </motion.button>

          <motion.button
            animate={{ x: noBtnPos.x, y: noBtnPos.y }}
            onMouseEnter={handleNoHover}
            onMouseLeave={() => setIsHoveringNo(false)}
            onClick={() => setLocation("/heartbreak")}
            className="
              px-10 py-4 rounded-full text-xl font-bold
              bg-white text-muted-foreground border-2 border-border
              hover:bg-slate-50 hover:text-slate-600
              flex items-center gap-2 transition-colors z-10
            "
          >
            <HeartCrack className="w-5 h-5" />
            {isHoveringNo ? "Please don't..." : "No, sorry"}
          </motion.button>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-2 mt-8 z-10">
        <footer className="text-muted-foreground/60 font-mono text-xs">
          Designed with ❤️ by ANTHONY DERC
        </footer>
      </div>
    </div>
  );
}
