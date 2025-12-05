"use client";

import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("dayflow-notes");
    if (saved !== null) setNotes(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("dayflow-notes", notes);
  }, [notes]);

  const clearNotes = () => {
    if (!confirm("Supprimer toutes les notes ?")) return;
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900">
            Notes du jour
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Vos notes sont sauvegardées automatiquement sur cet appareil.
          </p>
        </header>

        <textarea
          className="w-full h-64 sm:h-80 md:h-[420px] p-4 text-sm sm:text-lg font-light bg-white text-gray-900 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-500 resize-none shadow-sm"
          placeholder="Écrivez vos pensées ici..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={clearNotes}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs sm:text-sm transition"
          >
            Effacer les notes
          </button>
        </div>
      </div>
    </div>
  );
}
