import type { MetadataRoute } from "next";
import { LAST_UPDATED_ISO, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${SITE_URL}/community-guidelines`,
      lastModified: LAST_UPDATED_ISO,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_UPDATED_ISO,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_UPDATED_ISO,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
