"use client";

import { useState, useMemo, ReactNode } from "react";
import { Command } from "@/app/types/commands";

interface UseCommandSearch {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCommands: Command[];
  highlightMatches: (text: string) => ReactNode;
}

export function useCommandSearch(initialCommands: Command[]): UseCommandSearch {
  const [searchQuery, setSearchQuery] = useState("");

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

  return {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
  };
}
