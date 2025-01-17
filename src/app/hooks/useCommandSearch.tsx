"use client";

import { useState, useMemo, ReactNode } from "react";
import { Command, Primitive } from "@/app/types/commands";

interface UseCommandSearch {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCommands: Command[];
  highlightMatches: (text: string) => ReactNode;
  currentPrimitive: Primitive;
  setCurrentPrimitive: (primitive: Primitive) => void;
  handlePrimitiveSelection: (selectedPrimitive: Primitive | null) => void;
}

export function useCommandSearch(
  initialCommands: Command[],
  initialPrimitive: Primitive
): UseCommandSearch {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPrimitive, setCurrentPrimitive] =
    useState<Primitive>(initialPrimitive);

  const filteredCommands = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return initialCommands;

    return initialCommands.filter(
      ({ title, additionalText }) =>
        title?.toLowerCase().includes(query) ||
        additionalText?.toLowerCase().includes(query)
    );
  }, [searchQuery, initialCommands]);

  const highlightMatches = (text: string): ReactNode => {
    if (!text || !searchQuery.trim()) return text || "";

    const queryRegex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(queryRegex);

    if (parts.length === 1) return text;

    return (
      <>
        {parts.map((part: string, i: number) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <strong key={i} className="bg-yellow-200">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  const handlePrimitiveSelection = (selectedPrimitive: Primitive | null) => {
    if (selectedPrimitive) {
      setCurrentPrimitive(selectedPrimitive);
    }
    // If nothing was selected, the currentPrimitive remains unchanged
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
    currentPrimitive,
    setCurrentPrimitive,
    handlePrimitiveSelection,
  };
}
