import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ferrosentry.dev/", changeFrequency: "monthly", priority: 1 },
    { url: "https://ferrosentry.dev/changelog/", changeFrequency: "weekly", priority: 0.5 },
  ];
}
