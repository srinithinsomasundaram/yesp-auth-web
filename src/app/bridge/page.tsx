"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/api";
import { Spinner } from "@/components/Spinner";
import { AUTH_URL } from "@/lib/navigation";

// Token handoff: receives at/rt via URL fragment, stores in module memory for this tab.
// If a ?relay= param is set to a *.yesp.space URL, forwards the tokens there instead.

function isTrustedYespOrigin(url: string): boolean {
  try {
    const { hostname, protocol } = new URL(url);
    return protocol === "https:" && (hostname === "yesp.space" || hostname.endsWith(".yesp.space"));
  } catch {
    return false;
  }
}

export default function BridgePage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const at = params.get("at");
    const rt = params.get("rt");
    const next = params.get("next") ?? "/console";

    // relay= forwards tokens to another Yesp app's bridge page
    const relay = new URLSearchParams(window.location.search).get("relay");

    if (at && rt) {
      setTokens(at, rt);
      history.replaceState(null, "", "/bridge");

      if (relay && isTrustedYespOrigin(relay)) {
        const relayUrl = new URL(relay);
        relayUrl.hash = new URLSearchParams({ at, rt, next }).toString();
        window.location.href = relayUrl.toString();
        return;
      }

      router.replace(next);
    } else {
      if (AUTH_URL && AUTH_URL !== window.location.origin) {
        window.location.href = `${AUTH_URL}/auth/login`;
      } else {
        router.replace("/auth/login");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner className="w-7 h-7 text-blue-600" />
    </div>
  );
}
