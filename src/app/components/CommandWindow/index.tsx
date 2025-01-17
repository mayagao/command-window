"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import CommandList from "./CommandList";
import { CategoryList } from "./CategoryList";
import { useCommandSearch } from "@/app/hooks/useCommandSearch";
import { primitiveData, PrimitiveItem } from "@/app/data/primitives";
import PrimitivePill from "../Primitives/PrimitivePill";
import { ViewMode } from "./types";
import { defaultCommands } from "@/app/data/commands";
import { TooltipArea } from "./TooltipArea";
import { Command, Primitive } from "@/app/types/commands";
import { categories } from "./data";

const CommandWindow = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("commands");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<Command | null>(null);
  const [showPill, setShowPill] = useState(true);
  const [isPillFocused, setIsPillFocused] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    filteredCommands,
    highlightMatches,
    currentPrimitive,
    handlePrimitiveSelection,
  } = useCommandSearch(defaultCommands, primitiveData.pr[0] as Primitive);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, viewMode]);

  const handlePillClick = () => {
    setShowPill(false);
    setViewMode("categories");
    setSearchQuery("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setViewMode("category-items");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const getFilteredItems = () => {
    // If no search query and a category is selected, show only that category's items
    if (!searchQuery.trim()) {
      if (selectedCategory) {
        // Return empty array for codebase since it doesn't have items
        if (selectedCategory === "codebase") {
          return [];
        }
        return (
          primitiveData[selectedCategory as keyof typeof primitiveData] || []
        );
      }
      return [];
    }

    // When there's a search query, always search across all categories
    const allItems = Object.values(primitiveData).flat();
    const matchingItems = allItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If we're in a specific category, prioritize those items but still show others
    if (selectedCategory) {
      return matchingItems.sort((a, b) => {
        if (a.type === selectedCategory && b.type !== selectedCategory)
          return -1;
        if (a.type !== selectedCategory && b.type === selectedCategory)
          return 1;
        return 0;
      });
    }

    return matchingItems;
  };

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

  const handlePrimitiveSelect = (item: PrimitiveItem) => {
    const primitive: Primitive = {
      type: item.type,
      title: item.title,
      number: item.number,
    };

    handlePrimitiveSelection(primitive);
    setViewMode("commands");
    setSearchQuery("");
    setSelectedCategory(null);
    setShowPill(true);
    setIsPillFocused(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Only block Enter key when focus is on a list item
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
          if (selectedItem) {
            if (viewMode === "categories") {
              if (selectedItem.isCodebase) {
                // Special handling for codebase - go back to commands
                const codebasePrimitive: Primitive = {
                  type: "codebase",
                  title: "Codebase",
                };
                handlePrimitiveSelection(codebasePrimitive);
                setViewMode("commands");
                setSearchQuery("");
                setSelectedCategory(null);
                setShowPill(true);
                setIsPillFocused(false);
              } else {
                // For all other categories, show their list
                handleCategorySelect(selectedItem.type);
              }
            } else if (
              viewMode === "category-items" &&
              "type" in selectedItem
            ) {
              handlePrimitiveSelect(selectedItem as PrimitiveItem);
            }
          }
        }
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, selectedIndex, searchQuery, handleCategorySelect]);

  const renderPrimitiveItem = (item: PrimitiveItem, index: number) => (
    <div
      className={`flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer ${
        index === selectedIndex ? "bg-gray-100" : ""
      }`}
      onClick={() => handlePrimitiveSelect(item)}
    >
      <PrimitivePill
        type={item.type}
        title={highlightMatches(item.title)}
        number={item.number}
      />
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case "categories":
        return (
          <CategoryList
            categories={getCurrentItems()}
            selectedCategory={selectedCategory || ""}
            onSelectCategory={handleCategorySelect}
            selectedIndex={selectedIndex}
            showSuffixIcon={true}
            onItemFocus={handleItemFocus}
          />
        );
      case "category-items":
        return (
          <CategoryList
            categories={getCurrentItems()}
            selectedCategory={selectedCategory || ""}
            onSelectCategory={(type) =>
              handlePrimitiveSelect(
                getCurrentItems()[selectedIndex] as PrimitiveItem
              )
            }
            selectedIndex={selectedIndex}
            showSuffixIcon={false}
            onItemFocus={handleItemFocus}
          />
        );
      default:
        return (
          <CommandList
            commands={getCurrentItems() as Command[]}
            selectedIndex={selectedIndex}
            onSelect={handleCommandSelect}
            highlightMatches={highlightMatches}
            onItemFocus={handleItemFocus}
            inputRef={inputRef}
          />
        );
    }
  };

  const handleCancel = () => {
    setViewMode("commands");
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const handleBack = () => {
    setViewMode("categories");
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const isContextSelectionMode =
    viewMode === "categories" || viewMode === "category-items";

  // Create a ref for the input
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommandSelect = (command: Command) => {
    if (command.onSelect) {
      command.onSelect();
    }
    // Add any other command handling logic here
  };

  const handleItemFocus = (index: number) => {
    setSelectedIndex(index);
    if (viewMode === "commands") {
      setSelectedItem(getCurrentItems()[index] as Command);
    }
  };

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-24 w-[640px] bg-white rounded-lg shadow-2xl border border-gray-200">
      <Header />
      <SearchInput
        ref={inputRef}
        value={searchQuery}
        onChange={setSearchQuery}
        onPillClick={handlePillClick}
        onCancel={handleCancel}
        onBack={handleBack}
        showBackButton={viewMode === "category-items"}
        isSelectingContext={isContextSelectionMode}
        currentPrimitive={currentPrimitive}
        showPill={showPill}
        isPillFocused={isPillFocused}
      />
      {renderContent()}
      <TooltipArea
        text={selectedItem?.additionalText}
        showDefaultMessage={!isContextSelectionMode}
        isCommand={selectedItem !== null && viewMode === "commands"}
        selectedCategory={
          viewMode === "categories" && selectedIndex >= 0
            ? categories[selectedIndex]?.title.toLowerCase()
            : undefined
        }
        viewMode={viewMode}
      />
    </div>
  );
};

export default CommandWindow;
