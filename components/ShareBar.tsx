"use client";

import { useState } from "react";
import { FacebookIcon, InstagramIcon, TiktokIcon, WhatsAppIcon } from "@/components/social";

type ShareBarProps = {
  title: string;
  url: string;
  className?: string;
};

export function ShareBar({ title, url, className = "" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  async function shareNative() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // el usuario canceló: no hacemos nada
        return;
      }
    }
    await copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // sin permisos de portapapeles: no hacemos nada
    }
  }

  const iconClass = "h-5 w-5";
  const baseClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-cream text-umber transition hover:scale-110 hover:bg-clay hover:text-cream";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en Facebook"
        title="Compartir en Facebook"
        className={baseClass}
      >
        <FacebookIcon className={iconClass} />
      </a>
      <button
        type="button"
        onClick={shareNative}
        aria-label="Compartir en Instagram"
        title="Compartir en Instagram"
        className={baseClass}
      >
        <InstagramIcon className={iconClass} />
      </button>
      <button
        type="button"
        onClick={shareNative}
        aria-label="Compartir en TikTok"
        title="Compartir en TikTok"
        className={baseClass}
      >
        <TiktokIcon className={iconClass} />
      </button>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir por WhatsApp"
        title="Compartir por WhatsApp"
        className={baseClass}
      >
        <WhatsAppIcon className={iconClass} />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copiar enlace"
        title="Copiar enlace"
        className={`inline-flex h-10 items-center gap-1.5 rounded-full border border-sand bg-cream px-4 text-sm font-medium text-umber transition hover:scale-105 hover:bg-clay hover:text-cream ${copied ? "bg-clay text-cream" : ""}`}
      >
        {copied ? "¡Enlace copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
}
