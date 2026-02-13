import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingHearts({ mood = "happy" }: { mood?: "happy" | "sad" }) {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: Math.random() * 20 + 10,
    }));
    setHearts(newHearts);
  }, []);

  const color = mood === "happy" ? "text-primary/30" : "text-blue-900/20";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute bottom-0 ${color}`}
          initial={{ y: "100vh", opacity: 0, x: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 0.8, 0],
            x: Math.sin(heart.id) * 50 // gentle sway
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
          }}
        >
          <Heart fill="currentColor" className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}
