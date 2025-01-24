import { PrimitiveItem } from "@/app/types/primitives";
import { ListContainer } from "./ListContainer";
import { ListItem } from "./ListItem";
import { EmptyState } from "./EmptyState";

interface PrimitiveListProps {
  items: PrimitiveItem[];
  selectedIndex: number;
  onItemFocus: (index: number) => void;
  highlightMatches: (text: string) => React.ReactNode;
  searchQuery: string;
  handleItemSelect: (item: PrimitiveItem) => void;
}

export function PrimitiveList({
  items,
  selectedIndex,
  onItemFocus,
  highlightMatches,
  handleItemSelect,
}: PrimitiveListProps) {
  if (!items.length) {
    return <EmptyState />;
  }

  return (
    <ListContainer>
      {items.map((item, index) => (
        <ListItem
          key={`${item.type}-${item.title}-${item.number || index}`}
          type={item.type}
          title={highlightMatches(item.title)}
          number={item.number}
          isSelected={index === selectedIndex}
          onClick={() => handleItemSelect(item)}
          index={index}
          onFocus={onItemFocus}
        />
      ))}
    </ListContainer>
  );
}
