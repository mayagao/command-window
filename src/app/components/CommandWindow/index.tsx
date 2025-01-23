"use client";

import { useState, useEffect } from "react";
import { CommandWindow } from "./CommandWindow";
import { CommandBar } from "./CommandBar";
import { useCommandWindowState } from "./state/useCommandWindowState";

export function CommandUI() {
  const [isPinned, setIsPinned] = useState(false);
  const { currentPrimitive } = useCommandWindowState();

  // Debug state changes
  useEffect(() => {
    console.log("isPinned state changed:", isPinned);
  }, [isPinned]);

  const handlePin = () => {
    setIsPinned(true);
    console.log("Pin clicked, setting isPinned to:", true);
  };

  const handleUnpin = () => {
    setIsPinned(false);
    console.log("Unpin clicked, setting isPinned to:", false);
  };

  return isPinned ? (
    <CommandBar onUnpin={handleUnpin} currentPrimitive={currentPrimitive} />
  ) : (
    <CommandWindow onPin={handlePin} />
  );
}

// Only export the main UI component
export default CommandUI;
