"use client";

import { useMood } from "@/components/MoodContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MoodCarousel() {
  const { mood, allMoods, setMoodById } = useMood();

  const currentIndex = allMoods.findIndex((m) => m.id === mood.id);

  const goPrev = () => {
    const idx = (currentIndex - 1 + allMoods.length) % allMoods.length;
    setMoodById(allMoods[idx].id);
  };

  const goNext = () => {
    const idx = (currentIndex + 1) % allMoods.length;
    setMoodById(allMoods[idx].id);
  };

  return (
    <div className="mt-4 w-full max-w-xl">
      <p className="text-[11px] sm:text-xs text-gray-500 mb-2">
        Comment voulez-vous que Dayflow se comporte aujourd&apos;hui ?
      </p>

      <div className="flex items-center gap-2">
        {/* bouton précédent */}
        <button
          onClick={goPrev}
          className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
        </button>

        {/* carte mood */}
        <motion.div
          key={mood.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-3 sm:px-5 sm:py-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-gray-400">
                Mood actuel
              </div>
              <div className="text-sm sm:text-base font-medium text-gray-900">
                {mood.label}
              </div>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white shadow"
              style={{ backgroundColor: mood.id === "focus"
                  ? "#2563EB"
                  : mood.id === "relax"
                  ? "#10B981"
                  : mood.id === "rush"
                  ? "#F97316"
                  : "#8B5CF6"
              }}
            >
              {mood.id === "focus" && "🎯"}
              {mood.id === "relax" && "🌿"}
              {mood.id === "rush" && "⚡"}
              {mood.id === "overwhelmed" && "💆"}
            </div>
          </div>

          <p className="mt-2 text-[11px] sm:text-xs text-gray-600">
            {mood.description}
          </p>

          <ul className="mt-2 text-[11px] text-gray-500 list-disc list-inside space-y-1">
            {mood.id === "focus" && (
              <>
                <li>Priorité visuelle aux tâches et au temps.</li>
                <li>Interface épurée, peu de distractions.</li>
              </>
            )}
            {mood.id === "relax" && (
              <>
                <li>Couleurs plus douces et apaisantes.</li>
                <li>Notes mises davantage en avant.</li>
              </>
            )}
            {mood.id === "rush" && (
              <>
                <li>Accent sur le progrès et ce qu&apos;il reste à faire.</li>
                <li>Feedback visuel plus énergique.</li>
              </>
            )}
            {mood.id === "overwhelmed" && (
              <>
                <li>Interface volontairement simplifiée.</li>
                <li>Moins de blocs visibles pour alléger la charge mentale.</li>
              </>
            )}
          </ul>

          {/* petits points pour changer de mood sur mobile */}
          <div className="mt-3 flex items-center justify-center gap-1 sm:hidden">
            {allMoods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMoodById(m.id)}
                className={`w-2 h-2 rounded-full ${
                  m.id === mood.id ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* bouton suivant */}
        <button
          onClick={goNext}
          className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
