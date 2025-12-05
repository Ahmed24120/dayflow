"use client";

import { useTasks } from "@/components/TasksContext";

export default function ProgressPage() {
  const { tasks } = useTasks();
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900">
            Progrès
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Statistiques basées sur vos tâches du jour.
          </p>
        </header>

        <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-6">
          <p className="text-sm sm:text-base text-gray-800 mb-3">
            {done} / {total} tâches complétées
          </p>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-3">
            <div
              className="h-3 bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            Vous avez accompli{" "}
            <span className="font-semibold">{progress}%</span> de votre
            journée.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
          <h2 className="text-lg font-light text-gray-900 mb-3">
            Détail des tâches
          </h2>
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucune tâche pour le moment.
            </p>
          ) : (
            <ul className="space-y-1 text-sm text-gray-700">
              {tasks.map((t) => (
                <li key={t.id}>
                  {t.completed ? "✅" : "⬜"} {t.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
