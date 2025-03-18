"use client";

import { RefObject, useEffect } from "react";
import Header from "./ui/Header";
import SearchInput from "./ui/SearchInput";
import { Content } from "./content/Content";
import { TooltipArea } from "./ui/TooltipArea";
import { useCommandWindowState } from "./state/useCommandWindowState";
import { createHandlers } from "./state/handlers";
import { categories } from "../../data/categories";
import { Command } from "@/app/types/commands";
import { PrimitiveItem } from "@/app/types/primitives";
import { Category } from "@/app/types/types";

interface CommandWindowProps {
  onPin: () => void;
}

export function CommandWindow({ onPin }: CommandWindowProps) {
  const {
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
    setSearchQuery,
    setSelectedCommand,
    setViewMode,
    getCurrentItems,
    highlightMatches,
    handleSearch,
    setSelectedCategory,
    setShowPill,
    setIsPillFocused,
    setSelectedIndex,
    handlePrimitiveSelection,
    selectedRepository,
    isDataLoaded,
  } = useCommandWindowState();

  const handlers = createHandlers({
    setViewMode,
    setSelectedCommand,
    setSearchQuery,
    setSelectedCategory,
    setShowPill,
    setIsPillFocused,
    setSelectedIndex,
    inputRef: inputRef as RefObject<HTMLInputElement>,
    handlePrimitiveSelection,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [viewMode, inputRef]);

  const isContextSelectionMode =
    viewMode === "categories" || viewMode === "category-items";

  const handleClose = () => {
    console.log("Close clicked");
  };

  const castGetCurrentItems = () => {
    return getCurrentItems as unknown as () => (
      | Command
      | PrimitiveItem
      | Category
    )[];
  };

  const handlePinClick = () => {
    onPin();
  };

  if (!isDataLoaded) {
    return (
      <div className="fixed left-1/2 transform -translate-x-1/2 top-24 w-[640px] bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
        Loading GitHub data...
      </div>
    );
  }

  return (
    <>
      <div className="fixed left-1/2 transform -translate-x-1/2 top-24 w-[640px] bg-white rounded-lg shadow-2xl border border-gray-200">
        <Header
          viewMode={viewMode}
          onBack={handlers.handleBackToCommands}
          onClose={handleClose}
          onPinToggle={handlePinClick}
          isPinned={false}
          currentPrimitive={currentPrimitive}
          selectedRepository={selectedRepository?.name || undefined}
          setViewMode={setViewMode}
        />
        <SearchInput
          ref={inputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          onPillClick={handlers.handlePillClick}
          onCancel={handlers.handleCancel}
          onBack={handlers.handleBack}
          showBackButton={viewMode === "category-items"}
          isSelectingContext={isContextSelectionMode}
          currentPrimitive={currentPrimitive}
          showPill={showPill && viewMode !== "command-result"}
          isPillFocused={isPillFocused}
          viewMode={viewMode}
          disabled={viewMode === "loading"}
          selectedCommand={selectedCommand}
          setSelectedCommand={setSelectedCommand}
          setViewMode={setViewMode}
          handleSearch={handleSearch}
        />
        <Content
          viewMode={viewMode}
          selectedCommand={selectedCommand}
          selectedIndex={selectedIndex}
          currentPrimitive={currentPrimitive as unknown as PrimitiveItem}
          getCurrentItems={castGetCurrentItems()}
          selectedCategory={selectedCategory}
          onSelect={handlers.handleCommandSelect}
          onSelectCategory={handlers.handleCategorySelect}
          onPrimitiveSelect={handlers.handlePrimitiveSelect}
          highlightMatches={highlightMatches}
          onItemFocus={handlers.handleItemFocus}
          inputRef={inputRef as RefObject<HTMLInputElement>}
          searchQuery={searchQuery}
          setViewMode={setViewMode}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
        />
        {viewMode !== "command-result" && viewMode !== "loading" && (
          <TooltipArea
            text={selectedItem?.prompt}
            showDefaultMessage={!isContextSelectionMode}
            isCommand={selectedItem !== null && viewMode === "commands"}
            selectedCategory={
              viewMode === "categories" && selectedIndex >= 0
                ? categories[selectedIndex]?.title.toLowerCase()
                : undefined
            }
            viewMode={viewMode}
          />
        )}
      </div>
    </>
  );
}
