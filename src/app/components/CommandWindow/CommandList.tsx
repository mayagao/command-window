"use client";

import { useRef, useEffect } from "react";
import { Command } from "@/app/types/commands";
import { ListItem } from "./ListItem";

interface CommandListProps {
  commands: Command[];
  selectedIndex: number;
  onSelect: (command: Command) => void;
  highlightMatches: (text: string) => React.ReactNode;
  onItemFocus?: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function CommandList({
  commands,
  selectedIndex,
  onSelect,
  highlightMatches,
  onItemFocus,
  inputRef,
}: CommandListProps) {
  const selectedItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the selected item when it changes
    if (selectedIndex >= 0) {
      selectedItemRef.current?.focus();
    } else {
      // When selectedIndex is -1, focus the search input
      inputRef.current?.focus();
    }
  }, [selectedIndex, inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // When arrow up is pressed on first item
    if (e.key === "ArrowUp" && selectedIndex <= 0) {
      e.preventDefault();
      onItemFocus?.(-1);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="overflow-y-auto max-h-[640px] px-3 py-2"
      role="listbox"
      aria-label="Commands list"
    >
      {commands.map((command, index) => (
        <ListItem
          ref={index === selectedIndex ? selectedItemRef : undefined}
          key={`${command.category}-${index}`}
          command={command}
          title={highlightMatches(command.title)}
          description={command.description || ""}
          isSelected={index === selectedIndex}
          onClick={() => onSelect(command)}
          index={index}
          onFocus={onItemFocus}
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
}

export default CommandList;
