import { ReactNode } from "react";
import { Command, Primitive } from "@/app/types/commands";

export type ViewMode =
  | "commands"
  | "categories"
  | "category-items"
  | "command-result"
  | "loading";

export type Category = {
  type: string;
  title: string;
  icon?: ReactNode;
  isCodebase?: boolean;
};

export interface CommandWindowState {
  viewMode: ViewMode;
  selectedCategory: string | null;
  selectedIndex: number;
  selectedItem: Command | null;
  selectedCommand: Command | null;
  showPill: boolean;
  isPillFocused: boolean;
  searchQuery: string;
}

export interface ContentProps {
  viewMode: ViewMode;
  selectedCommand: Command | null;
  selectedIndex: number;
  currentPrimitive: Primitive;
  onBack: () => void;
  onSelect: (command: Command) => void;
  highlightMatches: (text: string) => ReactNode;
  onItemFocus: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}
