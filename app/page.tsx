"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/components/TasksContext";
import { useMood } from "@/components/MoodContext";
import MoodSelector from "@/components/MoodSelector";

export default function Home() {
  const { tasks } = useTasks();
  const { mood } = useMood();

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const open = total - done;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  const [notesPreview, setNotesPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("dayflow-notes");
    if (!saved) {
      setNotesPreview(null);
      return;
    }
    const trimmed = saved.trim();
    if (!trimmed) {
      setNotesPreview(null);
      return;
    }
    const preview =
      trimmed.length > 160 ? trimmed.slice(0, 160) + "..." : trimmed;
    setNotesPreview(preview);
  }, []);

  const now = new Date();
  const formattedDate = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  // comportement selon le mood
  const showNotes = mood.showNotesOnHome;
  const showProgress = mood.showProgressOnHome;
  const simplified = mood.simplifiedLayout;
  const emphasizeTimer = mood.emphasizeTimer;

  return (
    <div className={`${mood.background} min-h-screen`}>
      <div className="bg-gradient-to-b from-white/85 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
          <header className="flex flex-col gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">{greeting},</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                Votre journée — {formattedDate}
              </h1>
            </div>

            <MoodSelector />

            <div className="mt-2 inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white shadow-sm border border-gray-100 px-3 sm:px-4 py-2 text-xs sm:text-sm">
              <span className="uppercase tracking-wide text-gray-400 text-[10px] sm:text-xs">
                Résumé du jour
              </span>
              <div className="h-5 w-px bg-gray-200" />
              <span className="text-gray-700">
                <span className="font-semibold">{done}</span> tâches faites
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-700">
                <span className="font-semibold">{open}</span> restantes
              </span>
              {showProgress && (
                <>
                  <div className="h-5 w-px bg-gray-200" />
                  <span className="text-gray-700">
                    {progress}% de la journée complétée
                  </span>
                </>
              )}
            </div>
          </header>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        {simplified ? (
          // 🟣 Mode OVERWHELMED : واجهة بسيطة جدًا
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-gray-100 p-5 sm:p-7"
          >
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-3">
              Une chose à la fois
            </h2>
            {open === 0 ? (
              <p className="text-sm text-gray-600">
                Vous avez complété toutes vos tâches. Le reste de la journée est
                à vous. Respirez ✨
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Pour ne pas surcharger votre esprit, nous affichons uniquement
                  la prochaine action à réaliser.
                </p>
                {tasks.filter((t) => !t.completed)[0] && (
                  <TaskCard task={tasks.filter((t) => !t.completed)[0]} />
                )}
                <a
                  href="/tasks"
                  className="inline-block mt-4 text-xs text-blue-600 hover:text-blue-700"
                >
                  Voir toutes les tâches →
                </a>
              </>
            )}
          </motion.section>
        ) : (
          // 🌈 باقي الأوضاع: layout كامل
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] mt-4">
            {/* Tâches + éventuellement Timer */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(15,23,42,0.08)] border border-gray-100 p-4 sm:p-6 md:p-7 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-light text-gray-900">
                    Tâches du jour
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                    Organisation adaptée à votre mode actuel.
                  </p>
                </div>
                <a
                  href="/tasks"
                  className={`text-[11px] sm:text-xs font-medium rounded-full px-3 py-1 text-white shadow-sm ${mood.accent}`}
                >
                  Gérer les tâches
                </a>
              </div>

              {emphasizeTimer && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      Session de focus
                    </p>
                    <p className="text-[11px] text-gray-500">
                      25 minutes pour avancer sans distraction.
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-full text-xs text-white bg-gray-900 hover:bg-gray-800">
                    Démarrer le timer
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-6 sm:py-8 px-4 text-center">
                    <p className="text-gray-600 text-xs sm:text-sm mb-3">
                      Vous n&apos;avez encore aucune tâche. Commencez par en
                      créer une première.
                    </p>
                    <a
                      href="/tasks"
                      className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 transition"
                    >
                      Ajouter une tâche
                    </a>
                  </div>
                ) : (
                  tasks.map((task) => <TaskCard key={task.id} task={task} />)
                )}
              </div>
            </motion.section>

            {/* Colonne droite : Progrès + Notes (selon mood) */}
            <div className="space-y-6 mt-1 lg:mt-0">
              {showProgress && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(15,23,42,0.07)] border border-gray-100 p-4 sm:p-6 md:p-7 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg sm:text-xl font-light text-gray-900">
                      Progrès
                    </h2>
                    <span className="text-[11px] sm:text-xs text-gray-500">
                      {done} / {total || 0} tâches complétées
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-2 sm:h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
                      Vous avez accompli{" "}
                      <span className="font-semibold">{progress}%</span> de
                      votre journée.
                    </p>
                  </div>
                  <a
                    href="/progress"
                    className="text-[11px] sm:text-xs text-blue-600 hover:text-blue-700"
                  >
                    Voir les statistiques détaillées →
                  </a>
                </motion.section>
              )}

              {showNotes && (
                <motion.section
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-gray-100 p-4 sm:p-6 md:p-7 flex flex-col"
                >
                  <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-3">
                    Notes du jour
                  </h2>
                  {notesPreview ? (
                    <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line flex-1">
                      {notesPreview}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500 flex-1">
                      Aucune note pour le moment. Utilisez cette section pour
                      capturer vos idées, pensées ou points importants de la
                      journée.
                    </p>
                  )}
                  <a
                    href="/notes"
                    className="mt-3 sm:mt-4 inline-block text-[11px] sm:text-xs text-blue-600 hover:text-blue-700"
                  >
                    Ouvrir les notes →
                  </a>
                </motion.section>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
