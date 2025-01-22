"use client";

import { ViewMode } from "../../../types/types";
import Keys from "../ui/Key";

interface ContextualTooltipProps {
  viewMode: ViewMode;
}

const ContextualTooltip = ({ viewMode }: ContextualTooltipProps) => {
  const getTooltipText = () => {
    switch (viewMode) {
      case "categories":
        return "Press Enter to select or Esc to go back";
      case "category-items":
        return "Press Esc to show all categories";
      default:
        return "Press ⌘K to change context";
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <span className="text-gray-600">{getTooltipText()}</span>
      {viewMode === "commands" && <Keys>⌘K</Keys>}
    </div>
  );
};

export default ContextualTooltip;
