"use client";

import { useState } from "react";
import { ProjectSymlinkIcon } from "@primer/octicons-react";
import { categoryIcons } from "@/app/data/categories";
import { defaultCommands } from "@/app/data/commands";
import { Command } from "@/app/types/commands";
import { PrimitiveItem } from "@/app/types/primitives";
import { ListItem } from "./list/ListItem";

interface CommandBarProps {
  onUnpin: () => void;
  currentPrimitive?: PrimitiveItem | null;
}

export function CommandBar({ onUnpin, currentPrimitive }: CommandBarProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Filter commands based on current primitive type
  const relevantCommands = defaultCommands.filter(
    (cmd) => cmd.relatedContext === currentPrimitive?.type
  );

  // Group commands by category
  const commandsByCategory = relevantCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white rounded-lg shadow-lg ring-1 ring-black/5 p-1">
      {Object.entries(commandsByCategory).map(([category, commands]) => {
        const IconComponent =
          categoryIcons[category as keyof typeof categoryIcons];
        const hasMultipleCommands = commands.length > 1;

        return (
          <div key={category} className="relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => {
                if (hasMultipleCommands) {
                  setOpenCategory(openCategory === category ? null : category);
                } else {
                  // Handle single command execution
                  console.log("Execute command:", commands[0]);
                }
              }}
              aria-label={`${category} commands`}
            >
              <IconComponent size={16} />
            </button>

            {/* Dropdown for multiple commands */}
            {hasMultipleCommands && openCategory === category && (
              <div className="absolute bottom-full mb-2 px-3 py-2 left-0 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1 dropdown">
                {commands.map((cmd, index) => (
                  <ListItem
                    index={index}
                    key={cmd.title}
                    command={cmd}
                    title={cmd.title}
                    onClick={() => {
                      console.log("Execute command:", cmd);
                      setOpenCategory(null);
                    }}
                    isSelected={index === 0 ? true : false}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="w-px h-5 bg-gray-200 mx-1" /> {/* Divider */}
      <button
        onClick={onUnpin}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Expand window"
      >
        <ProjectSymlinkIcon size={16} />
      </button>
    </div>
  );
}
