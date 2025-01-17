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
      return "Use ↑↓ to navigate, enter to browse";
    }

    if (viewMode === "category-items") {
      return "Use ↑↓ to navigate, enter to select a new context";
    }

    if (showDefaultMessage) {
      return "Use ↑↓ to navigate, enter to ask Copilot";
    }

    if (selectedCategory) {
      return `Category: ${selectedCategory}`;
    }

    return "";
  };

  return (
    <div className="px-4 py-2 border-t border-gray-200">
      <div className="fs-small text-gray-500 ml-1">{getTooltipText()}</div>
    </div>
  );
};
