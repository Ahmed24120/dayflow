"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckSquare, FileText, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useMood } from "@/components/MoodContext";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: Home, label: "Accueil", path: "/" },
  { icon: CheckSquare, label: "Tâches", path: "/tasks" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: BarChart3, label: "Progrès", path: "/progress" },
];

export default function FloatingCircle() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { mood } = useMood();

  useEffect(() => {
    const current = menuItems.find((i) => i.path === pathname) ?? null;
    setActiveItem(current);
  }, [pathname]);

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      e.preventDefault();
    },
    []
  );

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - 28,
        y: e.clientY - 28,
      });
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  const toggleMenu = useCallback(() => {
    if (!isDragging) setIsOpen((prev) => !prev);
  }, [isDragging]);

  const handleMenuItemClick = useCallback(
    (item: MenuItem) => {
      router.push(item.path);
      setActiveItem(item);
      setIsOpen(false);
    },
    [router]
  );

  const ActiveIcon = activeItem?.icon;

  const circleColor =
    mood.id === "focus"
      ? "bg-blue-600"
      : mood.id === "relax"
      ? "bg-emerald-500"
      : mood.id === "rush"
      ? "bg-orange-500"
      : "bg-violet-500";

  return (
    <>
      <motion.div
        className={`
          fixed z-50 
          w-12 h-12 sm:w-14 sm:h-14 
          ${circleColor}
          rounded-full shadow-2xl flex items-center justify-center 
          cursor-move select-none text-white
        `}
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleDragStart}
        onClick={toggleMenu}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        animate={isOpen ? { scale: 1.1 } : { scale: 1 }}
      >
        {isOpen ? (
          <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }}>
            ×
          </motion.div>
        ) : ActiveIcon ? (
          <ActiveIcon size={20} />
        ) : (
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-white/80 rounded-full" />
            <div className="w-1 h-1 bg-white/80 rounded-full" />
            <div className="w-1 h-1 bg-white/80 rounded-full" />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {menuItems.map((item, index) => {
              const angle = (index * (2 * Math.PI)) / menuItems.length;
              const radius = 96;
              const x = position.x + 28 + radius * Math.cos(angle) - 22;
              const y = position.y + 28 + radius * Math.sin(angle) - 22;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.path}
                  className="absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 text-white border border-slate-700 flex items-center justify-center text-xl shadow-lg pointer-events-auto"
                  style={{ left: x, top: y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMenuItemClick(item)}
                  whileHover={{ scale: 1.1 }}
                  title={item.label}
                >
                  <Icon size={18} />
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
