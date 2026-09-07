"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import posthog from "posthog-js";

/**
 * Identifies the authenticated Clerk user to PostHog so that client-side
 * events and server-side events share a stable distinct ID.
 * Render this component once inside the ClerkProvider tree.
 */
export function PostHogUserIdentifier() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
    } else {
      // User has signed out — reset so the next session starts fresh
      posthog.reset();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}
