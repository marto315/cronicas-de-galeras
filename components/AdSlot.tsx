"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slotId,
  label = "Publicidad",
  className = "",
}: {
  slotId: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const adsense = siteConfig.adsense;

  useEffect(() => {
    if (!adsense.enabled) return;
    try {
      const w = window as Window;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      /* AdSense puede fallar en bloqueadores de anuncios; se ignora. */
    }
  }, [adsense.enabled]);

  if (!adsense.enabled) {
    return (
      <div
        className={`flex min-h-24 items-center justify-center rounded-xl border border-dashed border-sand bg-cream/60 px-4 text-center text-sm text-ink/50 ${className}`}
      >
        {label} · {siteConfig.name}
      </div>
    );
  }

  return (
    <div ref={ref} className={`mx-auto max-w-4xl ${className}`}>
      <ins
        className="adsbygoogle block min-h-24"
        style={{ display: "block" }}
        data-ad-client={adsense.clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}