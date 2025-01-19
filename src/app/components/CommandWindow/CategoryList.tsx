"use client";

import { ListItem } from "./ListItem";
import { PrimitiveItem } from "@/app/data/primitives";
import { useRef, useEffect } from "react";
import { ListContainer } from "./ListContainer";

interface CategoryListProps {
  categories: PrimitiveItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedIndex: number;
  showSuffixIcon?: boolean;
  onItemFocus?: (index: number) => void;
  highlightMatches?: (text: string) => React.ReactNode;
  searchQuery?: string;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedIndex,
  showSuffixIcon = true,
  onItemFocus,
  highlightMatches,
  searchQuery,
}: CategoryListProps) {
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Set first item as selected by default
  useEffect(() => {
    if (selectedIndex === -1 && categories.length > 0) {
      onItemFocus?.(0);
    }
  }, [categories.length, selectedIndex, onItemFocus]);

  return (
    <ListContainer>
      {categories.map((category, index) => (
        <ListItem
          ref={index === selectedIndex ? selectedItemRef : undefined}
          key={`${category.type}-${index}`}
          type={category.type}
          title={
            searchQuery && highlightMatches
              ? highlightMatches(category.title)
              : category.title
          }
          number={category.number}
          isSelected={index === selectedIndex}
          onClick={() => onSelectCategory(category.type)}
          showSuffixIcon={showSuffixIcon && !category.isCodebase}
          isCodebase={category.isCodebase}
          index={index}
          onFocus={onItemFocus}
        />
      ))}
    </ListContainer>
  );
}
