"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Initializes PostHog and emits a $pageview on every route change.
 *
 * Configured to point at the same project October's autonomous loop monitors:
 * project 376069. The public key is safe to ship in client code.
 *
 * Override at build time with NEXT_PUBLIC_POSTHOG_KEY / NEXT_PUBLIC_POSTHOG_HOST.
 */
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  "phc_vE2ozoUAtNXwxFmNGCqpbFGGRbwzEv9LzRcGZL6DZD4r";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let inited = false;
function ensureInit() {
  if (inited || typeof window === "undefined") return;
  inited = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // we send manually below to handle SPA navigation
    capture_pageleave: true,
    autocapture: true,
    person_profiles: "always",
    loaded: (ph) => {
      // Mark which clone deployment this is — useful for filtering events in October.
      ph.register({
        clone_target: "zfellows.com",
        clone_repo: "ayush-kumar-prog/zfellows-clone-for-october",
      });
    },
  });
}

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    ensureInit();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    const url =
      window.location.origin +
      pathname +
      (search?.toString() ? `?${search.toString()}` : "");
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, search]);

  return <>{children}</>;
}
