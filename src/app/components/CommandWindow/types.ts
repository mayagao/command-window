import { ReactNode } from "react";

export type ViewMode = "commands" | "categories" | "category-items";

export type Category = {
  type: string;
  title: string;
  icon?: ReactNode;
  isCodebase?: boolean;
};
