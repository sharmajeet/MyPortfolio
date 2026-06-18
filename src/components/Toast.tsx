import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckIcon } from "./icons";

type ToastItem = { id: number; title: string; description?: string };
type ToastContextValue = { toast: (t: Omit<ToastItem, "id">) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((t: Omit<ToastItem, "id">) => {
    setItems((prev) => [...prev, { id: ++counter, ...t }]);
  }, []);

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={3200}>
        {children}
        {items.map((item) => (
          <ToastPrimitive.Root
            key={item.id}
            onOpenChange={(open) => !open && remove(item.id)}
            className="toast-root flex items-center gap-3 rounded-xl border border-app bg-surface px-4 py-3 shadow-2xl shadow-black/20"
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
              style={{ background: "var(--accent-solid)", color: "var(--on-accent)" }}
            >
              <CheckIcon className="h-4 w-4" />
            </span>
            <div>
              <ToastPrimitive.Title className="text-sm font-semibold">{item.title}</ToastPrimitive.Title>
              {item.description && (
                <ToastPrimitive.Description className="text-xs text-soft">{item.description}</ToastPrimitive.Description>
              )}
            </div>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-6 right-6 z-[200] flex w-80 max-w-[90vw] flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
