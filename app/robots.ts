import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const url = siteConfig.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin/"],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}