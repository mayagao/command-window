"use client";

import { Command } from "@/app/types/commands";
import { ReactNode } from "react";
import { ListItem } from "./ListItem";

interface CommandListProps {
  commands: Command[];
  selectedIndex: number;
  onSelect: (command: Command) => void;
  highlightMatches: (text: string) => ReactNode;
}

export function CommandList({
  commands,
  selectedIndex,
  onSelect,
  highlightMatches,
}: CommandListProps) {
  return (
    <div className="overflow-y-auto max-h-[60vh]">
      {commands.map((command, index) => (
        <ListItem
          key={index}
          command={command}
          title={highlightMatches(command.title)}
          isSelected={index === selectedIndex}
          onClick={() => onSelect(command)}
        />
      ))}
    </div>
  );
}

export default CommandList;
