"use client";

import { useState } from "react";
import { useTasks } from "@/components/TasksContext";
import TaskCard from "@/components/TaskCard";

export default function TasksPage() {
  const { tasks, addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"work" | "personal" | "health">("work");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(title, type);
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900">
            Tâches
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Ajoutez, visualisez et complétez vos tâches du jour.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mb-6 sm:mb-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <input
            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:border-blue-500 bg-white"
            placeholder="Nouvelle tâche..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-blue-500"
            value={type}
            onChange={(e) =>
              setType(e.target.value as "work" | "personal" | "health")
            }
          >
            <option value="work">Travail</option>
            <option value="personal">Personnel</option>
            <option value="health">Santé</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
          >
            Ajouter
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucune tâche pour le moment.
            </p>
          ) : (
            tasks.map((t) => <TaskCard key={t.id} task={t} />)
          )}
        </div>
      </div>
    </div>
  );
}
