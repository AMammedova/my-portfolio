"use client";

import { useEffect } from "react";

export const GtagEvents = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const eventName = target.getAttribute("data-event");

      if (
        eventName &&
        typeof window !== "undefined" &&
        typeof window.gtag === "function"
      ) {
        window.gtag("event", eventName, {
          event_category: "interaction",
          event_label: target.textContent || "",
        });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
};
