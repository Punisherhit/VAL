import { useState } from "react";
import { Music, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  url: string;
  label: string;
}

export function MusicPlayer({ url, label }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    setIsPlaying(!isPlaying);
    // In a real browser environment, autoplaying audio programmatically without user gesture 
    // is often blocked. We simply open the link in a new tab for this implementation 
    // to ensure the music actually plays.
    if (!isPlaying) {
      window.open(url, "_blank");
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-3 px-6 py-4 rounded-full
        shadow-lg transition-all duration-300
        ${isPlaying 
          ? 'bg-primary text-primary-foreground shadow-primary/40 animate-pulse' 
          : 'bg-white text-foreground hover:bg-primary/5'
        }
      `}
    >
      <div className={`p-2 rounded-full ${isPlaying ? 'bg-white/20' : 'bg-primary/10'}`}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
      </div>
      <span className="font-bold font-display text-lg">{label}</span>
      <Music size={18} className={isPlaying ? "animate-bounce" : "opacity-50"} />
    </motion.button>
  );
}
