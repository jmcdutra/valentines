"use client";

import { useState, useEffect, useCallback } from "react";
import { Bug } from "lucide-react";

const DEV_MODE_KEY = "devMode";

export default function DevToggle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      setActive(localStorage.getItem(DEV_MODE_KEY) === "true");
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setActive((prev) => {
      const next = !prev;
      try {
        if (next) {
          localStorage.setItem(DEV_MODE_KEY, "true");
        } else {
          localStorage.removeItem(DEV_MODE_KEY);
        }
      } catch {}
      // force reload so the app picks up the change
      window.location.reload();
      return next;
    });
  }, []);

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        top: 6,
        right: 6,
        zIndex: 9999,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 3,
        opacity: active ? 0.8 : 0.25,
        transition: "opacity 0.2s",
        lineHeight: 0,
      }}
      title={active ? "desativar dev mode" : "ativar dev mode"}
      aria-label="toggle dev mode"
    >
      <Bug size={10} color={active ? "#c0392b" : "#999"} />
    </button>
  );
}
