import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

const BASE = "https://ar13.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/thoughts", "/photos"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));
  const posts = getPosts().map((p) => ({
    url: `${BASE}/thoughts/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));
  return [...pages, ...posts];
}
