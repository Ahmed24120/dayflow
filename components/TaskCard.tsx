"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  type: string;
}

const typeColors: Record<string, string> = {
  work: "bg-blue-500",
  personal: "bg-green-500",
  health: "bg-red-500",
};

export default function TaskCard({ task }: { task: Task }) {
  const [completed, setCompleted] = useState(task.completed);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div className="flex items-center p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition">
      <button
        onClick={toggleCompleted}
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
          completed ? "bg-green-500" : "border-2 border-slate-600"
        }`}
      >
        {completed && <FaCheck className="text-white" />}
      </button>
      <div className="flex-1">
        <p
          className={`text-slate-200 ${
            completed ? "line-through text-slate-500" : ""
          }`}
        >
          {task.title}
        </p>
      </div>
      <div
        className={`w-3 h-3 rounded-full ${
          typeColors[task.type] || "bg-gray-500"
        }`}
      />
    </div>
  );
}