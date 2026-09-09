import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/auth/login", "/auth/register", "/help/", "/security"],
        disallow: [
          "/console/",
          "/admin/",
          "/auth/mfa",
          "/auth/smart-login",
          "/auth/verify-email",
          "/auth/forgot-password",
          "/auth/reset-password",
          "/auth/oauth/",
          "/api/",
        ],
      },
    ],
    sitemap: [
      "https://accounts.yesp.space/sitemap.xml",
      "https://auth.yesp.space/sitemap.xml",
    ],
  };
}
