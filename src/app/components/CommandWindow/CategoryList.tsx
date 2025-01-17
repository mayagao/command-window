"use client";

import { ListItem } from "./ListItem";
import { PrimitiveItem } from "@/app/data/primitives";
import { useRef } from "react";

interface CategoryListProps {
  categories: PrimitiveItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedIndex: number;
  showSuffixIcon?: boolean;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedIndex,
  showSuffixIcon = true,
  onItemFocus,
}: CategoryListProps & {
  onItemFocus?: (index: number) => void;
}) {
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const handleListFocus = (e: React.FocusEvent) => {
    if (e.target === e.currentTarget && selectedIndex >= 0) {
      selectedItemRef.current?.focus();
    }
  };

  return (
    <div
      className="overflow-y-auto max-h-[640px] px-3 py-2"
      role="listbox"
      aria-label="Options list"
      tabIndex={0}
      onFocus={handleListFocus}
    >
      {categories.map((category, index) => (
        <ListItem
          ref={index === selectedIndex ? selectedItemRef : undefined}
          key={`${category.type}-${index}`}
          type={category.type}
          title={category.title}
          number={category.number}
          isSelected={index === selectedIndex}
          onClick={() => onSelectCategory(category.type)}
          showSuffixIcon={showSuffixIcon && !category.isCodebase}
          isCodebase={category.isCodebase}
          index={index}
          onFocus={onItemFocus}
        />
      ))}
    </div>
  );
}
