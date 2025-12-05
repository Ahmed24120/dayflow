"use client";

import { useMood } from "@/components/MoodContext";
import { motion } from "framer-motion";

export default function MoodSwitcher() {
  const { mood, allMoods, setMoodById } = useMood();

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs uppercase tracking-wide text-gray-500">
        Mood
      </span>
      <div className="flex gap-2 flex-wrap">
        {allMoods.map((m) => {
          const isActive = m.id === mood.id;
          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMoodById(m.id)}
              className={`px-3 py-1 rounded-full text-xs border transition ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {m.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
