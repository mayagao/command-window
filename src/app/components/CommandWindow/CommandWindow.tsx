"use client";

import { useState } from "react";
import { CommandBar } from "./CommandBar";
import { ListContainer } from "./list/ListContainer";

export function CommandWindow() {
  const [isPinned, setIsPinned] = useState(false);

  if (isPinned) {
    return <CommandBar onUnpin={() => setIsPinned(false)} />;
  }

  return (
    <CommandBar className="relative z-50">
      <ListContainer
        isPinned={isPinned}
        onPinToggle={() => setIsPinned(!isPinned)}
      >
        {/* ... existing content ... */}
      </ListContainer>
    </CommandBar>
  );
}
