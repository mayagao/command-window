"use client";

import { useRef, useEffect } from "react";
import { Command } from "@/app/types/commands";
import { ListItem } from "./ListItem";
import { ListContainer } from "./ListContainer";

interface CommandListProps {
  commands: Command[];
  selectedIndex: number;
  onSelect: (command: Command) => void;
  highlightMatches: (text: string) => React.ReactNode;
  onItemFocus?: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  currentContext: string;
}

export function CommandList({
  commands,
  selectedIndex,
  onSelect,
  highlightMatches,
  onItemFocus,
  inputRef,
  currentContext,
}: CommandListProps) {
  const selectedItemRef = useRef<HTMLDivElement>(null);
  const filteredCommands = commands.filter(
    (cmd) => cmd.relatedContext === currentContext
  );

  useEffect(() => {
    if (selectedIndex === -1 && filteredCommands.length > 0) {
      onItemFocus?.(0);
    }
  }, [filteredCommands.length, selectedIndex, onItemFocus]);

  useEffect(() => {
    if (selectedIndex >= 0) {
      // Don't focus list items in commands view
      // selectedItemRef.current?.focus();
    } else {
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
    <ListContainer>
      {filteredCommands.map((command, index) => (
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
    </ListContainer>
  );
}

export default CommandList;
