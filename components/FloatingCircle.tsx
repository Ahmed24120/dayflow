"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckSquare, FileText, Calendar, BarChart3, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: <Home size={20} />, label: "Accueil", path: "/" },
  { icon: <CheckSquare size={20} />, label: "Tâches", path: "/tasks" },
  { icon: <FileText size={20} />, label: "Notes", path: "/notes" },
  { icon: <Calendar size={20} />, label: "Calendrier", path: "/calendar" },
  { icon: <BarChart3 size={20} />, label: "Progrès", path: "/progress" },
  { icon: <Phone size={20} />, label: "Défi", path: "/challenge" },
];

export default function FloatingCircle() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - 30,
      y: e.clientY - 30,
    });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
      return () => {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);

  const toggleMenu = useCallback(() => {
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  }, [isDragging, isOpen]);

  const handleMenuItemClick = useCallback((path: string) => {
    router.push(path);
    setIsOpen(false);
  }, [router]);

  return (
    <>
      <motion.div
        className="fixed z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl flex items-center justify-center cursor-move select-none"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={handleDragStart}
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 1.2 } : { scale: 1 }}
      >
        <div className="text-white">
          {isOpen ? (
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }}>×</motion.div>
          ) : (
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-white/80 rounded-full"></div>
              <div className="w-1 h-1 bg-white/80 rounded-full"></div>
              <div className="w-1 h-1 bg-white/80 rounded-full"></div>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {menuItems.map((item, index) => {
              const angle = (index * (2 * Math.PI)) / menuItems.length;
              const radius = 100;
              const x = position.x + 30 + radius * Math.cos(angle) - 20;
              const y = position.y + 30 + radius * Math.sin(angle) - 20;

              return (
                <motion.button
                  key={index}
                  className="absolute w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-white text-xl shadow-lg pointer-events-auto"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMenuItemClick(item.path)}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(30, 41, 59, 0.95)" }}
                  title={item.label}
                >
                  {item.icon}
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}