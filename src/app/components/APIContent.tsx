"use client";

import { useCommandWindowState } from "./CommandWindow/state/useCommandWindowState";

export function APIContent() {
  const { currentPrimitive } = useCommandWindowState();

  if (!currentPrimitive) return null;

  return <div></div>;
}
