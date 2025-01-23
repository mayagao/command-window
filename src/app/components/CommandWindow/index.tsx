"use client";

import { useState } from "react";
import { CommandWindow } from "./CommandWindow";
import { CommandBar } from "./CommandBar";
import { useCommandWindowState } from "./state/useCommandWindowState";

export function CommandUI() {
  const [isPinned, setIsPinned] = useState(false);
  const { currentPrimitive } = useCommandWindowState();

  // When pinned, show only the command bar
  if (isPinned) {
    return (
      <CommandBar
        onUnpin={() => setIsPinned(false)}
        currentPrimitive={currentPrimitive}
      />
    );
  }

  // When unpinned, show only the command window
  return <CommandWindow onPin={() => setIsPinned(true)} />;
}

// Export both the UI component and the individual components

export default CommandUI;
