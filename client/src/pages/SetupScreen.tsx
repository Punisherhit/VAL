import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Heart, Calendar, Users, ArrowRight } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";

export default function SetupScreen() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    myName: localStorage.getItem("myName") || "",
    partnerName: localStorage.getItem("partnerName") || "",
    metDate: localStorage.getItem("metDate") || "",
  });

  useEffect(() => {
    localStorage.setItem("myName", formData.myName);
    localStorage.setItem("partnerName", formData.partnerName);
    localStorage.setItem("metDate", formData.metDate);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/love");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts mood="happy" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="glass-card p-6 md:p-10 max-w-2xl w-full text-center relative z-10 mx-4"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-4"
        >
          <Heart className="w-16 h-16 text-primary fill-primary/20" />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-sm">
          Perfect! Let's get set up...
        </h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary flex items-center gap-2">
              <Users size={16} /> Your Name
            </label>
            <input 
              required
              type="text"
              value={formData.myName}
              onChange={(e) => setFormData(prev => ({ ...prev, myName: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-xl border-2 border-primary/20 focus:border-primary outline-none bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary flex items-center gap-2">
              <Heart size={16} /> Partner's Name
            </label>
            <input 
              required
              type="text"
              value={formData.partnerName}
              onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
              placeholder="Enter their name"
              className="w-full px-4 py-2 rounded-xl border-2 border-primary/20 focus:border-primary outline-none bg-white/50"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-primary flex items-center gap-2">
              <Calendar size={16} /> The Day You Met
            </label>
            <input 
              required
              type="date"
              value={formData.metDate}
              onChange={(e) => setFormData(prev => ({ ...prev, metDate: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl border-2 border-primary/20 focus:border-primary outline-none bg-white/50"
            />
          </div>
          
          <div className="md:col-span-2 flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="
                px-10 py-3 rounded-full text-xl font-bold shadow-xl
                bg-gradient-to-r from-primary to-rose-500 text-white
                shadow-primary/30 hover:shadow-primary/50
                flex items-center gap-2
              "
            >
              Continue <ArrowRight size={20} />
            </motion.button>
          </div>
        </form>
      </motion.div>

      <footer className="mt-8 text-muted-foreground/60 font-mono text-xs z-10">
        Designed with ❤️ by ANTHONY DERC
      </footer>
    </div>
  );
}