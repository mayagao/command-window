"use client";

import { useCommandWindowState } from "./CommandWindow/state/useCommandWindowState";

export function APIContent() {
  const { currentPrimitive } = useCommandWindowState();

  if (!currentPrimitive) return null;

  return (
    <div>
      <p>Type: {currentPrimitive.type}</p>
      <p>Title: {currentPrimitive.title}</p>
      <a
        target="_blank"
        className="link text-blue-600 underline"
        href={currentPrimitive.url}
      >
        url: {currentPrimitive.url}
      </a>
    </div>
  );
}
