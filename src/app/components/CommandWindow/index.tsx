"use client";

import { useEffect } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import { Content } from "./Content";
import { TooltipArea } from "./TooltipArea";
import { useCommandWindowState } from "./useCommandWindowState";
import { createHandlers } from "./handlers";
import { categories } from "./data";

const CommandWindow = () => {
  const {
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
  } = useCommandWindowState();

  const handlers = createHandlers({
    setViewMode,
    setSelectedCommand,
    setSearchQuery,
    setSelectedCategory,
    setShowPill,
    setIsPillFocused,
    setSelectedIndex,
    inputRef,
    handlePrimitiveSelection,
  });

  // Auto-focus input on mount and viewMode change
  useEffect(() => {
    inputRef.current?.focus();
  }, [viewMode]);

  const isContextSelectionMode =
    viewMode === "categories" || viewMode === "category-items";

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-24 w-[640px] bg-white rounded-lg shadow-2xl border border-gray-200">
      <Header
        viewMode={viewMode}
        onBack={handlers.handleBackToCommands}
        currentPrimitive={currentPrimitive}
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
      />
      <Content
        viewMode={viewMode}
        selectedCommand={selectedCommand}
        selectedIndex={selectedIndex}
        currentPrimitive={currentPrimitive}
        getCurrentItems={getCurrentItems}
        selectedCategory={selectedCategory}
        onSelect={handlers.handleCommandSelect}
        onSelectCategory={handlers.handleCategorySelect}
        onPrimitiveSelect={handlers.handlePrimitiveSelect}
        highlightMatches={highlightMatches}
        onItemFocus={handlers.handleItemFocus}
        inputRef={inputRef}
      />
      {viewMode !== "command-result" && (
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
      )}
    </div>
  );
};

export default CommandWindow;
