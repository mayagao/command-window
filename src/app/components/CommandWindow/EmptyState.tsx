import { ListItem } from "./ListItem";
import { ListContainer } from "./ListContainer";

export function EmptyState() {
  return (
    <ListContainer>
      <ListItem title="No results found" isDisabled className="text-gray-500" />
    </ListContainer>
  );
}
