"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function RightRailAd() {
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
      <aside className="hidden lg:block" aria-label="Publicidad">
        <div className="sticky top-24 flex min-h-[300px] w-72 flex-col items-center justify-center rounded-2xl border border-dashed border-sand bg-cream/60 px-6 text-center text-sm text-ink/50">
          <span className="mb-2 text-xs uppercase tracking-[0.2em]">Publicidad</span>
          <p>
            Espacio para tu aviso aquí
            <br />
            <span className="text-ink/40">(configura AdSense en .env.local)</span>
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:block" aria-label="Publicidad">
      <div ref={ref} className="sticky top-24">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", minWidth: 120, minHeight: 300, width: 288 }}
          data-ad-client={adsense.clientId}
          data-ad-slot={adsense.slots.rail}
          data-ad-format="vertical"
        />
      </div>
    </aside>
  );
}
