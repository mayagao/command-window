"use client";

import { ListItem } from "./ListItem";
import { PrimitiveItem } from "@/app/data/primitives";

interface CategoryListProps {
  categories: PrimitiveItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedIndex: number;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedIndex,
}: CategoryListProps) {
  return (
    <div>
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
}
