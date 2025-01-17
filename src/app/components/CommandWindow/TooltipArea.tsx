import { Key } from "../ui/Key";

interface TooltipAreaProps {
  text?: string;
  showDefaultMessage?: boolean;
  isCommand?: boolean;
  selectedCategory?: string;
  viewMode: ViewMode;
}

export const TooltipArea = ({
  text,
  showDefaultMessage = true,
  isCommand,
  selectedCategory,
  viewMode,
}: TooltipAreaProps) => {
  const getTooltipText = () => {
    if (viewMode === "categories") {
      return "Use ↑↓ to navigate, enter to select";
    }

    if (viewMode === "category-items") {
      return "Use ↑↓ to navigate, enter to select a new context";
    }

    if (text && isCommand) {
      return text;
    }

    if (showDefaultMessage) {
      return "Type a command or use ↑↓ to navigate";
    }

    if (selectedCategory) {
      return `Category: ${selectedCategory}`;
    }

    return "";
  };

  return (
    <div className="px-3 py-2 text-sm text-gray-500 border-t border-gray-200">
      {getTooltipText()}
    </div>
  );
};
