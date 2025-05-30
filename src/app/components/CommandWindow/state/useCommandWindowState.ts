"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ViewMode } from "../../../types/types";
import { Command } from "@/app/types/commands";
import { useCommandSearch } from "@/app/hooks/useCommandSearch";
import { primitiveData as defaultPrimitiveData } from "@/app/data/primitives";
import { defaultCommands } from "@/app/data/commands";
import { categories } from "../../../data/categories";
import { PrimitiveType } from "@/app/types/primitives";
import { Category } from "@/app/types/types";
import { PrimitiveItem } from "@/app/types/primitives";
import { Repository } from "@/app/data/repositories";
import { fetchGitHubData } from "@/app/data/primitives";
import { CommandService } from "@/app/services/commands/commandService";

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
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);
  const [primitiveData, setPrimitiveData] = useState(defaultPrimitiveData);

  // Add loading state
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with a default primitive
  const defaultPrimitive: PrimitiveItem = {
    type: "pr",
    title: "Loading...", // Will be replaced when data loads
    number: 0,
  };

  // Initialize with the default primitive
  const [currentPrimitive, setCurrentPrimitive] =
    useState<PrimitiveItem>(defaultPrimitive);

  // Search and command state
  const {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
    handlePrimitiveSelection,
  } = useCommandSearch(defaultCommands, currentPrimitive);

  // Move getFilteredItems inside useCallback
  const getCurrentItems = useCallback((): (
    | Command
    | Category
    | PrimitiveItem
  )[] => {
    const getFilteredItems = () => {
      const query = searchQuery.trim().toLowerCase();

      if (!query && selectedCategory) {
        return selectedCategory === "codebase"
          ? []
          : [
              ...(primitiveData[
                selectedCategory as keyof typeof primitiveData
              ] || []),
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
  }, [
    viewMode,
    searchQuery,
    selectedCategory,
    primitiveData,
    filteredCommands,
  ]);

  const LOADING_TIMEOUT = 2500;

  // Reset selectedIndex when viewMode changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [viewMode]);

  // Move handleItemSelect before the useEffect
  const handleItemSelect = useCallback(
    async (selectedItem: Command | Category | PrimitiveItem) => {
      switch (viewMode) {
        case "categories":
          if (isCategory(selectedItem) && selectedItem.isCodebase) {
            handlePrimitiveSelection({
              type: "file",
              title: "Codebase",
            });
            setViewMode("commands");
            setSearchQuery("");
            setSelectedCategory(null);
            setShowPill(true);
            setIsPillFocused(false);
          } else if (hasType(selectedItem)) {
            const itemType = selectedItem.type;
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
              title: selectedItem.title.trim(),
              number: selectedItem.number,
              url: selectedItem.url,
            };
            setCurrentPrimitive(primitive);
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
          const result = await CommandService.executeCommand(command);
          if (result) {
            // Convert CommandResponse to PrimitiveItem with proper type checking
            const primitiveType = isPrimitiveType(result.type)
              ? result.type
              : "file"; // Default to file if not a valid PrimitiveType

            const primitive: PrimitiveItem = {
              type: primitiveType,
              title: result.title,
              // Add other needed properties
            };
            setCurrentPrimitive(primitive);
          } else {
            setTimeout(() => {
              setViewMode("command-result");
            }, LOADING_TIMEOUT);
          }
          break;
      }
    },
    [viewMode, handlePrimitiveSelection, LOADING_TIMEOUT, setSearchQuery]
  );

  // Then the useEffect that uses it
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
            handleItemSelect(selectedItem);
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
    handleItemSelect,
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

  const handleRepositorySelect = useCallback(
    (repo: Repository) => {
      setSelectedRepository(repo);
      setViewMode("categories");
      setSearchQuery("");
      setSelectedCategory(null);
      setSelectedIndex(-1);
    },
    [setSearchQuery]
  );

  const handleCategorySelect = useCallback(
    async (category: string) => {
      setSelectedCategory(category);
      setViewMode("category-items");
      setSearchQuery("");
      setSelectedIndex(-1);
    },
    [setSearchQuery]
  );

  // Update the GitHub data fetching effect
  useEffect(() => {
    async function loadGitHubData() {
      setIsDataLoaded(false);
      // Pass true to force refresh on initial load
      const data = await fetchGitHubData(true);
      setPrimitiveData(data);

      if (data.pr && data.pr.length > 0) {
        setCurrentPrimitive(data.pr[0]);
      }

      setIsDataLoaded(true);
    }
    loadGitHubData();
  }, []);

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
    selectedRepository,
    primitiveData,
    isDataLoaded,

    // Setters
    setViewMode,
    setSelectedCategory,
    setSelectedIndex,
    setSelectedItem,
    setSelectedCommand,
    setShowPill,
    setIsPillFocused,
    setSearchQuery,
    setSelectedRepository,
    setPrimitiveData,

    // Methods
    getCurrentItems,
    highlightMatches,
    handlePrimitiveSelection,
    handleSearch,
    handleRepositorySelect,
    handleCategorySelect,
    handleItemSelect,
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
  return "type" in item && "title" in item && !("isCodebase" in item);
}

// Helper function to check if a string is a valid PrimitiveType
function isPrimitiveType(type: string): type is PrimitiveType {
  return [
    "file",
    "issue",
    "pr",
    "space",
    "project",
    "folder",
    "codebase",
    "repository",
  ].includes(type as PrimitiveType);
}
