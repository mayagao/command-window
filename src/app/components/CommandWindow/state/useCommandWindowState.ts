import { useState, useRef, useEffect, useCallback } from "react";
import { ViewMode } from "../../../types/types";
import { Command } from "@/app/types/commands";
import { useCommandSearch } from "@/app/hooks/useCommandSearch";
import { primitiveData } from "@/app/data/primitives";
import { defaultCommands } from "@/app/data/commands";
import { categories } from "../../../data/categories";
import { PrimitiveType } from "@/app/types/primitives";
import { Category } from "@/app/types/types";
import { PrimitiveItem } from "@/app/types/primitives";

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

  // Initialize with the first primitive item
  const initialPrimitive = primitiveData.file[0];

  // Search and command state
  const {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
    currentPrimitive,
    handlePrimitiveSelection,
  } = useCommandSearch(defaultCommands, initialPrimitive);

  // Item filtering logic
  const getFilteredItems = ():
    | (Command | Category | PrimitiveItem)[]
    | string => {
    const query = searchQuery.trim().toLowerCase();

    if (!query && selectedCategory) {
      return selectedCategory === "codebase"
        ? []
        : [
            ...(primitiveData[selectedCategory as keyof typeof primitiveData] ||
              []),
          ];
    }

    if (query) {
      const allPrimitives = Object.values(primitiveData).flat();
      return allPrimitives.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.number?.toString() || "").includes(query)
      );
    }

    return [...categories];
  };

  const getCurrentItems = useCallback((): (
    | Command
    | Category
    | PrimitiveItem
  )[] => {
    switch (viewMode) {
      case "categories":
        return searchQuery.trim()
          ? (getFilteredItems() as (Command | Category | PrimitiveItem)[])
          : (categories as Category[]);
      case "category-items":
        return getFilteredItems() as (Command | Category | PrimitiveItem)[];
      default:
        return filteredCommands as Command[];
    }
  }, [viewMode, searchQuery, categories, getFilteredItems, filteredCommands]);

  const LOADING_TIMEOUT = 2500;

  // Reset selectedIndex when viewMode changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [viewMode]);

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
                if (isCategory(selectedItem) && selectedItem.isCodebase) {
                  handlePrimitiveSelection({
                    type: "codebase",
                    title: "Codebase",
                  });
                  setViewMode("commands");
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setShowPill(true);
                  setIsPillFocused(false);
                } else if (hasType(selectedItem)) {
                  const itemType = selectedItem.type;
                  console.log(selectedItem);
                  if (itemType) {
                    setSelectedCategory(itemType);
                    setViewMode("category-items");
                    requestAnimationFrame(() => {
                      inputRef.current?.focus();
                    });
                  }
                }
                break;
              case "category-items":
                if (isPrimitiveItem(selectedItem)) {
                  const primitive = {
                    type: selectedItem.type as PrimitiveType,
                    title: selectedItem.title,
                    number: selectedItem.number,
                  };
                  handlePrimitiveSelection(primitive);
                  setViewMode("commands");
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setShowPill(true);
                  setIsPillFocused(false);
                }
                break;
              case "commands":
                const command = selectedItem as Command;
                setSelectedCommand(command);
                setSelectedItem(command);
                setViewMode("loading");
                setTimeout(() => {
                  setViewMode("command-result");
                }, LOADING_TIMEOUT);
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

// Helper function to check if selectedItem is a Category
function isCategory(
  item: Command | Category | PrimitiveItem
): item is Category {
  return "type" in item && !("relatedContext" in item);
}

// Helper function to check if selectedItem has a 'type' property
function hasType(
  item: Command | Category | PrimitiveItem
): item is Category | PrimitiveItem {
  return (item as Category | PrimitiveItem).type !== undefined;
}

// Helper function to check if selectedItem is a PrimitiveItem
function isPrimitiveItem(
  item: Command | Category | PrimitiveItem
): item is PrimitiveItem {
  return "type" in item && "number" in item;
}
