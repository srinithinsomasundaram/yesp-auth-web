"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredTokens, setTokens, getMe, type Me } from "@/lib/api";
import { CONSOLE_URL } from "@/lib/navigation";

export function NavbarUser() {
  const [me, setMe] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Already has an in-memory AT — just fetch the profile
      if (getStoredTokens()) {
        try { setMe(await getMe()); } catch { /* token invalid */ }
        setReady(true);
        return;
      }

      // Try silent refresh via RT cookie or in-memory RT
      try {
        const res = await fetch("/api/v1/auth/token/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) { setReady(true); return; }
        const data = await res.json() as { accessToken: string; refreshToken?: string };
        setTokens(data.accessToken, data.refreshToken ?? "");
        try { setMe(await getMe()); } catch { /* profile failed */ }
      } catch { /* network error */ }

      setReady(true);
    };

    load();
  }, []);

  // Don't render anything until we know the auth state — avoids sign-in flash
  if (!ready) return null;

  const consoleHref = CONSOLE_URL || "https://accounts.yesp.space";

  if (me) {
    const displayName = (me.displayName ?? [me.firstName, me.lastName].filter(Boolean).join(" ")) || me.email.split("@")[0];
    const firstName = displayName.split(" ")[0];
    const initial = firstName[0]?.toUpperCase() ?? "Y";

    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {initial}
          </div>
          <span className="text-xs font-medium text-slate-700">{firstName}</span>
        </div>
        <a
          href={consoleHref + "/console"}
          className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Console
        </a>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
    >
      Sign in
    </Link>
  );
}

// Mobile version — single element for the right side of the topbar
export function NavbarUserMobile() {
  const [me, setMe] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (getStoredTokens()) {
        try { setMe(await getMe()); } catch { /* invalid */ }
        setReady(true);
        return;
      }
      try {
        const res = await fetch("/api/v1/auth/token/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) { setReady(true); return; }
        const data = await res.json() as { accessToken: string; refreshToken?: string };
        setTokens(data.accessToken, data.refreshToken ?? "");
        try { setMe(await getMe()); } catch { /* profile failed */ }
      } catch { /* network */ }
      setReady(true);
    };
    load();
  }, []);

  if (!ready) return null;

  const consoleHref = (CONSOLE_URL || "https://accounts.yesp.space") + "/console";

  if (me) {
    const displayName = (me.displayName ?? [me.firstName, me.lastName].filter(Boolean).join(" ")) || me.email.split("@")[0];
    const initial = displayName[0]?.toUpperCase() ?? "Y";
    return (
      <a href={consoleHref} className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
        {initial}
      </a>
    );
  }

  return (
    <Link href="/auth/login" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
      Sign in
    </Link>
  );
}
