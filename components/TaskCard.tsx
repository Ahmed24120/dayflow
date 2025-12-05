"use client";

import { FaCheck } from "react-icons/fa";
import type { Task } from "@/components/TasksContext";
import { useTasks } from "@/components/TasksContext";

const typeColors: Record<string, string> = {
  work: "bg-blue-500",
  personal: "bg-green-500",
  health: "bg-red-500",
};

export default function TaskCard({ task }: { task: Task }) {
  const { toggleTask } = useTasks();

  return (
    <div className="flex items-center p-3 sm:p-4 bg-slate-900/3 bg-white/80 rounded-xl border border-gray-200 hover:shadow-sm transition">
      <button
        onClick={() => toggleTask(task.id)}
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 sm:mr-4 ${
          task.completed
            ? "bg-emerald-500"
            : "border-2 border-gray-300 bg-white"
        }`}
      >
        {task.completed && <FaCheck className="text-white text-xs" />}
      </button>
      <div className="flex-1">
        <p
          className={`text-sm sm:text-base text-gray-900 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </p>
      </div>
      <div
        className={`w-3 h-3 rounded-full ${
          typeColors[task.type] || "bg-gray-400"
        }`}
      />
    </div>
  );
}
