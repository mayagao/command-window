import { useState, useRef, useEffect } from "react";
import { ViewMode } from "./types";
import { Command } from "@/app/types/commands";
import { useCommandSearch } from "@/app/hooks/useCommandSearch";
import { primitiveData } from "@/app/data/primitives";
import { defaultCommands } from "@/app/data/commands";
import { categories } from "./data";

export function useCommandWindowState() {
  // Core state
  const [viewMode, setViewMode] = useState<ViewMode>("commands");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<Command | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [showPill, setShowPill] = useState(true);
  const [isPillFocused, setIsPillFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Search and command state
  const {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
    currentPrimitive,
    handlePrimitiveSelection,
  } = useCommandSearch(defaultCommands, primitiveData.pr[0]);

  // Item filtering logic
  const getCurrentItems = () => {
    switch (viewMode) {
      case "categories":
        return searchQuery.trim() ? getFilteredItems() : categories;
      case "category-items":
        return getFilteredItems();
      default:
        return filteredCommands;
    }
  };

  const getFilteredItems = () => {
    if (!searchQuery.trim() && selectedCategory) {
      return selectedCategory === "codebase"
        ? []
        : primitiveData[selectedCategory as keyof typeof primitiveData] || [];
    }
    return [];
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        (e.target as HTMLElement).getAttribute("role") === "option"
      ) {
        return;
      }

      const items = getCurrentItems();
      if (!items.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          const nextIndex = (selectedIndex + 1) % items.length;
          setSelectedIndex(nextIndex);
          if (viewMode === "commands") {
            setSelectedItem(items[nextIndex] as Command);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (selectedIndex <= 0) {
            setSelectedIndex(-1);
            if (viewMode === "commands") {
              setSelectedItem(null);
            }
          } else {
            const prevIndex = selectedIndex - 1;
            setSelectedIndex(prevIndex);
            if (viewMode === "commands") {
              setSelectedItem(items[prevIndex] as Command);
            }
          }
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            const selectedItem = items[selectedIndex];
            switch (viewMode) {
              case "categories":
                if ("isCodebase" in selectedItem && selectedItem.isCodebase) {
                  handlePrimitiveSelection({
                    type: "codebase",
                    title: "Codebase",
                  });
                  setViewMode("commands");
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setShowPill(true);
                  setIsPillFocused(false);
                } else {
                  setSelectedCategory(selectedItem.type);
                  setViewMode("category-items");
                  requestAnimationFrame(() => {
                    inputRef.current?.focus();
                  });
                }
                break;
              case "category-items":
                const primitive = {
                  type: selectedItem.type,
                  title: selectedItem.title,
                  number: selectedItem.number,
                };
                handlePrimitiveSelection(primitive);
                setViewMode("commands");
                setSearchQuery("");
                setSelectedCategory(null);
                setShowPill(true);
                setIsPillFocused(false);
                break;
              case "commands":
                const command = selectedItem as Command;
                setSelectedCommand(command);
                setSelectedItem(command);
                setViewMode("loading");
                setTimeout(() => {
                  setViewMode("command-result");
                }, 5000);
                break;
            }
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    viewMode,
    selectedIndex,
    getCurrentItems,
    handlePrimitiveSelection,
    setSelectedCommand,
    setSelectedItem,
  ]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setViewMode("loading");

    // Simulate API call - match the 5 second duration
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsLoading(false);
    setViewMode("command-result");

    // Update the selected command with the new query
    if (selectedCommand) {
      setSelectedCommand({
        ...selectedCommand,
        title: query,
      });
    }

    // Clear the search query after loading
    setSearchQuery("");

    // Focus the input after a brief delay to ensure state updates are complete
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return {
    // State
    viewMode,
    selectedCategory,
    selectedIndex,
    selectedItem,
    selectedCommand,
    showPill,
    isPillFocused,
    searchQuery,
    currentPrimitive,
    inputRef,
    filteredCommands,
    isLoading,

    // Setters
    setViewMode,
    setSelectedCategory,
    setSelectedIndex,
    setSelectedItem,
    setSelectedCommand,
    setShowPill,
    setIsPillFocused,
    setSearchQuery,

    // Methods
    getCurrentItems,
    highlightMatches,
    handlePrimitiveSelection,
    handleSearch,
  };
}
