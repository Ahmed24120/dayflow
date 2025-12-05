"use client";

import { useMood } from "@/components/MoodContext";
import { motion } from "framer-motion";

const moodIcons: Record<string, string> = {
  focus: "🎯",
  relax: "🌿",
  rush: "⚡",
  overwhelmed: "💆",
};

export default function MoodSelector() {
  const { mood, allMoods, setMoodById } = useMood();

  return (
    <div className="mt-4 w-full max-w-2xl">
      <p className="text-[11px] sm:text-xs text-gray-500 mb-2">
        Choisissez comment Dayflow doit se comporter aujourd&apos;hui :
      </p>
      <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-3">
        {allMoods.map((m) => {
          const active = m.id === mood.id;
          return (
            <motion.button
              key={m.id}
              onClick={() => setMoodById(m.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 flex items-start gap-2 rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 text-left ${
                active
                  ? "border-gray-900 bg-gray-900 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
              }`}
            >
              <div className="mt-[2px] text-lg">
                {moodIcons[m.id] ?? "•"}
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wide">
                  {m.label}
                </div>
                <p className="text-[10px] sm:text-xs mt-0.5 opacity-80">
                  {m.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
