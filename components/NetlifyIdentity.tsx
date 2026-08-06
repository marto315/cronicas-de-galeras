"use client";

import Script from "next/script";

export default function NetlifyIdentity() {
  return (
    <Script
      id="netlify-identity"
      strategy="afterInteractive"
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      onReady={() => {
        const identity = window.netlifyIdentity;
        if (identity) {
          identity.on("init", (user) => {
            if (!user) {
              identity.on("login", () => {
                document.location.href = "/admin/";
              });
            }
          });
        }
      }}
    />
  );
}
