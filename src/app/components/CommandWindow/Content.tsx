import { CommandList } from "./CommandList";
import { CategoryList } from "./CategoryList";
import { Shimmer } from "./Shimmer";
import { ViewMode } from "./types";
import { Command, Primitive } from "@/app/types/commands";
import { PrimitiveItem } from "@/app/data/primitives";
import { TooltipArea } from "./TooltipArea";

interface ContentProps {
  viewMode: ViewMode;
  selectedCommand: Command | null;
  selectedIndex: number;
  currentPrimitive: Primitive;
  getCurrentItems: () => (Command | PrimitiveItem)[];
  selectedCategory: string | null;
  onSelect: (command: Command) => void;
  onSelectCategory: (category: string) => void;
  onPrimitiveSelect: (item: PrimitiveItem) => void;
  highlightMatches: (text: string) => React.ReactNode;
  onItemFocus: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function Content({
  viewMode,
  selectedCommand,
  selectedIndex,
  currentPrimitive,
  getCurrentItems,
  selectedCategory,
  onSelect,
  onSelectCategory,
  onPrimitiveSelect,
  highlightMatches,
  onItemFocus,
  inputRef,
}: ContentProps) {
  const items = getCurrentItems();

  switch (viewMode) {
    case "loading":
      return (
        <div>
          <Shimmer />
          <TooltipArea
            text="Use ↑↓ to navigate, enter to select"
            showDefaultMessage={true}
            isCommand={false}
            viewMode={viewMode}
          />
        </div>
      );

    case "command-result":
      return (
        <>
          <div className="px-5 py-4">
            <div className="">
              <span className="text-gray-700">{selectedCommand?.title}</span>
            </div>
            <div className="mt-3">
              <div className="">
                <div>
                  <div className="font-medium fs-small text-gray-500 mb-2">
                    5 references
                  </div>
                  <ol className="space-y-3">
                    <li>
                      <strong>Documentation Enhancements:</strong> Added a new
                      ADR for the context provider LSP specification and updated
                      various ADRs and documentation files.
                    </li>
                    <li>
                      <strong>Readme Improvements:</strong> Cleaned up and
                      organized the README.md file, including removing redundant
                      lines, improving the nesting in sections related to "Core
                      Productivity" and "CIP", and updating the content for
                      "Applied Science" and "Models".
                    </li>
                    <li>
                      <strong>Structural Changes:</strong> Added a new column
                      named "o3-mini" for better organization.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <TooltipArea
            text="Press / for suggestions"
            showDefaultMessage={true}
            isCommand={false}
            viewMode={viewMode}
          />
        </>
      );

    case "categories":
      return (
        <CategoryList
          categories={items as PrimitiveItem[]}
          selectedCategory={selectedCategory || ""}
          onSelectCategory={onSelectCategory}
          selectedIndex={selectedIndex}
          showSuffixIcon={true}
          onItemFocus={onItemFocus}
        />
      );

    case "category-items":
      return (
        <CategoryList
          categories={items as PrimitiveItem[]}
          selectedCategory={selectedCategory || ""}
          onSelectCategory={() =>
            onPrimitiveSelect(items[selectedIndex] as PrimitiveItem)
          }
          selectedIndex={selectedIndex}
          showSuffixIcon={false}
          onItemFocus={onItemFocus}
        />
      );

    default:
      return (
        <CommandList
          commands={items as Command[]}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          highlightMatches={highlightMatches}
          onItemFocus={onItemFocus}
          inputRef={inputRef}
          currentContext={currentPrimitive.type}
        />
      );
  }
}
