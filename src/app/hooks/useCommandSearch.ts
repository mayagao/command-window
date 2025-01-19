import { Command } from "@/app/types/commands";
import { useState, useCallback } from "react";
import { PrimitiveItem } from "@/app/data/primitives";

export function useCommandSearch(
  defaultCommands: Command[],
  initialPrimitive: PrimitiveItem
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPrimitive, setCurrentPrimitive] = useState(initialPrimitive);

  const filteredCommands = defaultCommands.filter((command) => {
    // If there's a search query, filter by search
    if (searchQuery.trim()) {
      return command.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    // Otherwise show commands based on primitive type
    switch (currentPrimitive.type) {
      case "folder":
      case "codebase":
      case "file":
        return command.category === "code";
      case "pr":
      case "issue":
        return command.category === "summary";
      case "project":
      case "space":
        return command.category === "knowledge";
      default:
        return true;
    }
  });

  const handlePrimitiveSelection = useCallback((primitive: PrimitiveItem) => {
    setCurrentPrimitive(primitive);
    setSearchQuery("");
  }, []);

  const highlightMatches = useCallback(
    (text: string) => {
      if (!searchQuery.trim()) return text;
      const regex = new RegExp(`(${searchQuery})`, "gi");
      const parts = text.split(regex);
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
              <span key={i} className="bg-yellow-100 font-medium">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    },
    [searchQuery]
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
    currentPrimitive,
    handlePrimitiveSelection,
  };
}
