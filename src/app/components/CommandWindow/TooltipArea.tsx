import { Key } from "../ui/Key";

interface TooltipAreaProps {
  text?: string;
  showDefaultMessage?: boolean;
  isCommand?: boolean;
  selectedCategory?: string;
  viewMode: "commands" | "categories" | "category-items";
}

export function TooltipArea({
  text,
  showDefaultMessage = true,
  isCommand = false,
  selectedCategory,
  viewMode,
}: TooltipAreaProps) {
  if (!text && !showDefaultMessage) return null;

  const getDefaultMessage = () => {
    // When viewing primitive categories
    if (viewMode === "categories") {
      if (selectedCategory) {
        return (
          <span className="flex items-center gap-1">
            Press <Key>Enter</Key> to view all {selectedCategory}
          </span>
        );
      }
      return (
        <span className="flex items-center gap-1">
          Use <Key>↑</Key> <Key>↓</Key> keys to navigate
        </span>
      );
    }

    // When viewing items within a category
    if (viewMode === "category-items") {
      return (
        <span className="flex items-center gap-1">
          Use <Key>↑</Key> <Key>↓</Key> keys to navigate or type to search
          anything
        </span>
      );
    }

    // When viewing commands (default)
    if (isCommand) {
      return (
        <span className="ml-1 text-gray-400">
          Press <Key>Enter</Key> to ask Copilot
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1">
        Use <Key>↑</Key> <Key>↓</Key> keys to navigate
      </span>
    );
  };

  return (
    <div className="px-3 py-2 text-sm text-gray-500 border-t border-gray-100">
      {text}
      {!text && showDefaultMessage && getDefaultMessage()}
    </div>
  );
}
