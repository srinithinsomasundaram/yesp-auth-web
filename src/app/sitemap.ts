import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const accountsPages: MetadataRoute.Sitemap = [
    {
      url: "https://accounts.yesp.space",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://accounts.yesp.space/security",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://accounts.yesp.space/help",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://accounts.yesp.space/help/passkeys",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://accounts.yesp.space/help/mfa",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://accounts.yesp.space/help/organizations",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://accounts.yesp.space/help/sessions",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const authPages: MetadataRoute.Sitemap = [
    {
      url: "https://auth.yesp.space/auth/login",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://auth.yesp.space/auth/register",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...accountsPages, ...authPages];
}
