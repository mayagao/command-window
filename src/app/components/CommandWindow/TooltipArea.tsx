import { Key } from "../ui/Key";

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
    switch (viewMode) {
      case "loading":
        return "Press Esc to stop response";
      case "command-result":
        return "Press / for suggestions";
      case "commands":
        return "Use ↑↓ to navigate, enter to select";
      case "categories":
        return selectedCategory
          ? `Select a ${selectedCategory}`
          : "Select a context";
      case "category-items":
        return "Select an item";
      default:
        return text;
    }
  };

  return (
    <div className="px-5 py-2 text-[13px] text-gray-500 border-t border-gray-200">
      {getTooltipText()}
    </div>
  );
}
