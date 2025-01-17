"use client";

import { PrimitiveItem } from "@/app/data/primitives";
import { ListItem } from "./ListItem";

interface CategoryListProps {
  categories: readonly PrimitiveItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <div className="overflow-y-auto max-h-[60vh]">
      {categories.map((category) => (
        <ListItem
          key={category.type}
          type={category.type}
          title={category.title}
          isSelected={category.type === selectedCategory}
          onClick={() => onSelectCategory(category.type)}
          showSuffixIcon={true}
        />
      ))}
    </div>
  );
}
