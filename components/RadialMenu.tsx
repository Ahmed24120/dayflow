// components/RadialMenu.tsx
"use client";

import type { ReactNode, CSSProperties } from "react";

interface RadialMenuItem {
  icon: ReactNode;
  label: string;
  path: string;
}

interface RadialMenuProps {
  isOpen: boolean;
  centerX: number;
  centerY: number;
  items: RadialMenuItem[];
  onItemClick: (path: string) => void;
}

export default function RadialMenu({
  isOpen,
  centerX,
  centerY,
  items,
  onItemClick,
}: RadialMenuProps) {
  if (!isOpen) return null;

  const radius = 100;
  const angleStep = (2 * Math.PI) / items.length;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {items.map((item, index) => {
        const angle = index * angleStep;
        const x = centerX + radius * Math.cos(angle) - 20;
        const y = centerY + radius * Math.sin(angle) - 20;

        const buttonStyle: CSSProperties & {
          [key: string]: string | number;
        } = {
          left: `${x}px`,
          top: `${y}px`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        };

        buttonStyle["--tx"] = `${radius * Math.cos(angle)}px`;
        buttonStyle["--ty"] = `${radius * Math.sin(angle)}px`;

        return (
          <button
            key={item.label}
            className="absolute w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xl shadow-lg pointer-events-auto radial-item"
            style={buttonStyle}
            onClick={() => onItemClick(item.path)}
            title={item.label}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
}
