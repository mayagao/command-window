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
  onShowAllCategories?: () => void;
}

export function CategoryList({
  categories,
  onSelectCategory,
  selectedIndex,
  showSuffixIcon = true,
  onItemFocus,
  highlightMatches,
  searchQuery,
  onShowAllCategories,
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
      {categories.length === 0 && searchQuery ? (
        <ListItem
          title="Show all categories"
          type="codebase"
          onClick={onShowAllCategories}
          isSelected={selectedIndex === 0}
          index={0}
          onFocus={onItemFocus}
        />
      ) : (
        categories.map((category, index) => (
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
            showSuffixIcon={
              !searchQuery && showSuffixIcon && category.type !== "codebase"
            }
            index={index}
            onFocus={onItemFocus}
          />
        ))
      )}
    </ListContainer>
  );
}
