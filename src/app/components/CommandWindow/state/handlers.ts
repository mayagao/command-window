import { Command, Primitive } from "@/app/types/commands";
import { ViewMode } from "../../../types/types";
import { PrimitiveItem } from "@/app/data/primitives";

interface HandlersConfig {
  setViewMode: (mode: ViewMode) => void;
  setSelectedCommand: (command: Command | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setShowPill: (show: boolean) => void;
  setIsPillFocused: (focused: boolean) => void;
  setSelectedIndex: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handlePrimitiveSelection: (primitive: Primitive) => void;
}

export function createHandlers({
  setViewMode,
  setSelectedCommand,
  setSearchQuery,
  setSelectedCategory,
  setShowPill,
  setIsPillFocused,
  setSelectedIndex,
  inputRef,
  handlePrimitiveSelection,
}: HandlersConfig) {
  const handleCommandSelect = (command: Command) => {
    setSelectedCommand(command);
    setViewMode("loading");
    setTimeout(() => {
      setViewMode("command-result");
    }, 2500);
  };

  const handleBackToCommands = () => {
    setViewMode("commands");
    setSelectedCommand(null);
    setSearchQuery("");
  };

  const handlePillClick = () => {
    setShowPill(false);
    setViewMode("categories");
    setSearchQuery("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setViewMode("category-items");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleCancel = () => {
    setViewMode("commands");
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const handleBack = () => {
    setViewMode("categories");
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const handleItemFocus = (index: number) => {
    setSelectedIndex(index);
  };

  const handlePrimitiveSelect = (item: PrimitiveItem) => {
    const primitive: Primitive = {
      type: item.type,
      title: item.title,
      number: item.number,
    };

    setViewMode("commands");
    setSearchQuery("");
    setSelectedCategory(null);
    setShowPill(true);
    setIsPillFocused(false);
    handlePrimitiveSelection(primitive);
  };

  return {
    handleCommandSelect,
    handleBackToCommands,
    handlePillClick,
    handleCategorySelect,
    handleCancel,
    handleBack,
    handleItemFocus,
    handlePrimitiveSelect,
  };
}
