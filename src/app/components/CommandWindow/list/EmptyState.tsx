import { ListItem } from "./ListItem";
import { ListContainer } from "./ListContainer";

export function EmptyState() {
  return (
    <ListContainer>
      <ListItem
        index={-1}
        title="No results found"
        isDisabled
        className="text-gray-500"
      />
    </ListContainer>
  );
}
