import { CommandList } from "./CommandList";
import { CategoryList } from "./CategoryList";
import { Shimmer } from "./Shimmer";
import { ViewMode } from "./types";
import { Command, Primitive } from "@/app/types/commands";
import { PrimitiveItem } from "@/app/data/primitives";

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
      return <Shimmer />;

    case "command-result":
      return (
        <div>
          <div className="px-3 py-2">
            <div className="text-sm text-gray-600">
              This is a placeholder response. In the future, this will be
              AI-generated content based on the command and context.
            </div>
          </div>
        </div>
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
