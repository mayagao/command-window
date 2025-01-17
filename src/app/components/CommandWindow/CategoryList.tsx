"use client";

import { PrimitiveItem } from "@/app/data/primitives";
import { ListItem } from "./ListItem";
import { Category } from "./types";

interface CategoryListProps {
  categories: readonly Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedIndex: number;
}

export const CategoryList = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  selectedIndex,
}: CategoryListProps) => {
  if (!categories?.length) return null;

  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <ListItem
          key={category.type}
          type={category.type}
          title={category.title}
          isSelected={index === selectedIndex}
          onClick={() => onSelectCategory(category.type)}
          showSuffixIcon={!category.isCodebase}
          isCodebase={category.isCodebase}
        />
      ))}
    </div>
  );
};
