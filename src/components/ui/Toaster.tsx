"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

let toastCount = 0;
let addToastFn: ((toast: Omit<Toast, "id">) => void) | null = null;

export function toast(message: string, type: "success" | "error" | "info" = "info") {
  if (addToastFn) {
    addToastFn({ message, type });
  }
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (toast) => {
      const id = String(++toastCount);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => { addToastFn = null; };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl min-w-[280px] max-w-[400px] text-white text-sm font-medium animate-fade-in",
            t.type === "success" && "bg-emerald-600",
            t.type === "error" && "bg-red-600",
            t.type === "info" && "bg-zinc-800 border border-zinc-700"
          )}
        >
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            className="text-white/70 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
