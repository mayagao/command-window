import { ViewMode } from "@/app/types/types";

interface TooltipAreaProps {
  text?: string;
  showDefaultMessage: boolean;
  isCommand: boolean;
  selectedCategory?: string;
  viewMode: ViewMode;
}

export function TooltipArea({
  text,
  showDefaultMessage,
  isCommand,
  selectedCategory,
  viewMode,
}: TooltipAreaProps) {
  const getTooltipText = () => {
    if (viewMode === "repository-select") {
      return text || "Select a repository to get started";
    }

    switch (viewMode) {
      case "loading":
        return "Press Esc to stop response";
      case "command-result":
        return "Press / for suggestions";
      case "commands":
        return "Use ↑↓ to navigate, enter to select";
      case "categories":
        return "Select a different context";
      case "category-items":
        return selectedCategory
          ? `Select a ${selectedCategory}`
          : "Select an item";
      default:
        return text;
    }
  };

  return (
    <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-200">
      {getTooltipText()}
    </div>
  );
}
