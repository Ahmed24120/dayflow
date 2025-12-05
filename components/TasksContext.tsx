"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type TaskType = "work" | "personal" | "health" | string;

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  type: TaskType;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (title: string, type: TaskType) => void;
  toggleTask: (id: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("dayflow-tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
        return;
      } catch {
        // fall back to default
      }
    }
    setTasks([
      { id: 1, title: "Réunion à 10h", completed: false, type: "work" },
      { id: 2, title: "Acheter du lait", completed: true, type: "personal" },
      { id: 3, title: "Faire du sport", completed: false, type: "health" },
    ]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("dayflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, type: TaskType) => {
    if (!title.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        completed: false,
        type,
      },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used within TasksProvider");
  }
  return ctx;
}
