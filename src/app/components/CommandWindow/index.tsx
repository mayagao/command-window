"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import CommandList from "./CommandList";
import { CategoryList } from "./CategoryList";
import { useCommandSearch } from "@/app/hooks/useCommandSearch";
import { primitiveData, PrimitiveItem } from "@/app/data/primitives";
import PrimitivePill from "../Primitives/PrimitivePill";
import { ViewMode, categories } from "./types";
import { defaultCommands } from "@/app/data/commands";
import { TooltipArea } from "./TooltipArea";

type ViewMode = "commands" | "categories" | "category-items";

const currentContext: PrimitiveItem = {
  type: "pr",
  title: "ADR for an Upload Service",
  number: 14535,
};

const CommandWindow = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("commands");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<Command | null>(null);
  const { searchQuery, setSearchQuery, filteredCommands, highlightMatches } =
    useCommandSearch(defaultCommands);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, viewMode]);

  const handlePillClick = () => {
    setViewMode("categories");
    setSearchQuery("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setViewMode("category-items");
  };

  const getFilteredItems = () => {
    // If no search query and a category is selected, show only that category's items
    if (!searchQuery.trim()) {
      if (selectedCategory) {
        return primitiveData[selectedCategory as keyof typeof primitiveData];
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

  const handleKeyDown = (e: KeyboardEvent) => {
    const items = getCurrentItems();
    if (!items.length) return;

    // Handle navigation keys
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
        const prevIndex =
          selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
        setSelectedIndex(prevIndex);
        if (viewMode === "commands") {
          setSelectedItem(items[prevIndex] as Command);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          const selectedItem = items[selectedIndex];
          if (selectedItem) {
            if (viewMode === "categories") {
              handleCategorySelect(selectedItem.type);
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
      className={`flex items-center p-2 hover:bg-gray-100 rounded-md ${
        index === selectedIndex ? "bg-gray-100" : ""
      }`}
    >
      <PrimitivePill
        type={item.type}
        title={highlightMatches(item.title)}
        number={item.number}
      />
    </div>
  );

  const renderCommandItem = (command: Command, index: number) => (
    <div
      className={`flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md ${
        index === selectedIndex ? "bg-gray-100" : ""
      }`}
    >
      <span className="text-gray-600">{command.icon}</span>
      <span>{highlightMatches(command.text)}</span>
      {command.rightText && (
        <span className="ml-auto text-gray-500 text-sm">
          {command.rightText}
        </span>
      )}
    </div>
  );

  const renderContent = () => {
    const listContainerClasses =
      "px-3 py-2 space-y-2 overflow-y-auto max-h-[60vh]";

    const renderFilesFoldersList = () => {
      const folders = primitiveData.folder;
      const searchLower = searchQuery.toLowerCase();

      const newFolderOption: PrimitiveItem = {
        type: "folder",
        title: "New folder...",
        isAction: true,
      };

      const filteredFolders = searchQuery
        ? folders.filter((f) => f.title.toLowerCase().includes(searchLower))
        : folders;

      // Only show new folder option if there's no search or it matches the search
      const showNewFolder = !searchQuery || "new folder".includes(searchLower);

      return (
        <div className="space-y-2">
          {/* New Folder Option */}
          {showNewFolder && (
            <div key="new-folder">
              {renderPrimitiveItem(newFolderOption, 0)}
            </div>
          )}
          {/* Existing Folders */}
          {filteredFolders.map((item, index) => (
            <div key={`folder-${index}`}>
              {renderPrimitiveItem(item, index + (showNewFolder ? 1 : 0))}
            </div>
          ))}
        </div>
      );
    };

    switch (viewMode) {
      case "categories":
        if (searchQuery.trim()) {
          return (
            <div className={listContainerClasses}>
              {getFilteredItems().map((item, index) => (
                <div key={`${item.type}-${index}`}>
                  {renderPrimitiveItem(item, index)}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div className={listContainerClasses}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory || ""}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        );

      case "category-items":
        if (selectedCategory === "folder") {
          return (
            <div className={listContainerClasses}>
              {renderFilesFoldersList()}
            </div>
          );
        }
        return (
          <div className={listContainerClasses}>
            {getFilteredItems().map((item, index) => (
              <div key={`${item.type}-${index}`}>
                {renderPrimitiveItem(item, index)}
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={listContainerClasses}>
            <CommandList
              commands={filteredCommands}
              highlightMatches={highlightMatches}
              selectedIndex={selectedIndex}
            />
          </div>
        );
    }
  };

  const handleCancel = () => {
    setViewMode("commands");
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const isContextSelectionMode =
    viewMode === "categories" || viewMode === "category-items";

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-24 w-[800px] bg-white rounded-lg shadow-2xl border border-gray-200">
      <Header />
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onPillClick={handlePillClick}
        onCancel={handleCancel}
        isSelectingContext={isContextSelectionMode}
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
