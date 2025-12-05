"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";

export type MoodId = "focus" | "relax" | "rush" | "overwhelmed";

export interface MoodConfig {
  id: MoodId;
  label: string;
  description: string;
  background: string;      // classe bg globale
  accent: string;          // couleur principale
  accentSoft: string;      // fond doux
  // comportements ergonomiques
  showNotesOnHome: boolean;
  showProgressOnHome: boolean;
  simplifiedLayout: boolean; // mode surcharge mentale
  emphasizeTimer: boolean;
}

interface MoodContextType {
  mood: MoodConfig;
  setMoodById: (id: MoodId) => void;
  allMoods: MoodConfig[];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

const MOODS: MoodConfig[] = [
  {
    id: "focus",
    label: "Focus",
    description: "Interface épurée, centrée sur les tâches et le temps.",
    background: "bg-slate-50",
    accent: "bg-blue-600 hover:bg-blue-700",
    accentSoft: "bg-blue-50",
    showNotesOnHome: false,
    showProgressOnHome: true,
    simplifiedLayout: false,
    emphasizeTimer: true,
  },
  {
    id: "relax",
    label: "Relax",
    description: "Ambiance douce, plus de place pour les notes.",
    background: "bg-emerald-50",
    accent: "bg-emerald-500 hover:bg-emerald-600",
    accentSoft: "bg-emerald-100",
    showNotesOnHome: true,
    showProgressOnHome: false,
    simplifiedLayout: false,
    emphasizeTimer: false,
  },
  {
    id: "rush",
    label: "Rush",
    description: "On met la pression sur ce qu’il reste à faire.",
    background: "bg-orange-50",
    accent: "bg-orange-500 hover:bg-orange-600",
    accentSoft: "bg-orange-100",
    showNotesOnHome: false,
    showProgressOnHome: true,
    simplifiedLayout: false,
    emphasizeTimer: false,
  },
  {
    id: "overwhelmed",
    label: "Overwhelmed",
    description: "Interface volontairement simplifiée pour respirer.",
    background: "bg-violet-50",
    accent: "bg-violet-500 hover:bg-violet-600",
    accentSoft: "bg-violet-100",
    showNotesOnHome: false,
    showProgressOnHome: false,
    simplifiedLayout: true,
    emphasizeTimer: false,
  },
];

export function MoodProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState<MoodId>("focus");

  const value = useMemo(() => {
    const found = MOODS.find((m) => m.id === currentId) ?? MOODS[0];
    return {
      mood: found,
      setMoodById: (id: MoodId) => setCurrentId(id),
      allMoods: MOODS,
    };
  }, [currentId]);

  return (
    <MoodContext.Provider value={value}>{children}</MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used within MoodProvider");
  return ctx;
}
