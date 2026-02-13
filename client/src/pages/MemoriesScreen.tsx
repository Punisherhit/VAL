import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Camera, X } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MEMORIES, type Memory } from "@/data/memories";

export default function MemoriesScreen() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 flex flex-col items-center p-4 relative">
      <FloatingHearts mood="happy" />

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/love" className="
          p-3 rounded-full bg-white/80 hover:bg-white shadow-md text-foreground/80 hover:text-primary
          transition-all duration-300 flex items-center gap-2 font-bold
        ">
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10 flex flex-col items-center mt-12"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-4"
        >
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 drop-shadow-lg" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-display text-primary mb-2 text-center drop-shadow-md">
          Our Memories 💕
        </h1>

        <p className="text-lg text-muted-foreground font-handwriting mb-8 text-center max-w-lg">
          Every moment with you is a treasure I hold close to my heart.
        </p>

        {/* Memories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
          {MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => setSelectedMemory(memory)}
            >
              <img 
                src={memory.imageUrl} 
                alt={memory.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-sm font-medium">{memory.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Memory Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/25 flex items-center gap-2"
        >
          <Camera size={20} />
          Add New Memory
        </motion.button>
      </motion.div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute -top-12 right-0 text-white hover:text-rose-300 transition-colors"
              >
                <X size={32} />
              </button>
              <img 
                src={selectedMemory.imageUrl} 
                alt={selectedMemory.caption}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white text-xl font-handwriting">{selectedMemory.caption}</p>
                <p className="text-white/60 text-sm mt-1">{selectedMemory.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto pb-4 text-center text-muted-foreground/60 font-mono text-xs z-10">
        Made with ❤️ by ANTHONY DERC
      </footer>
    </div>
  );
}

