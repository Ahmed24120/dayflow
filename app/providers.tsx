"use client";

import type React from "react";
import { TasksProvider } from "@/components/TasksContext";
import { MoodProvider } from "@/components/MoodContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MoodProvider>
      <TasksProvider>{children}</TasksProvider>
    </MoodProvider>
  );
}
